const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require('mysql2'); 
const path = require('path');

const app = express();
const porta = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/scripts', express.static(path.join(__dirname, '..', 'scripts')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SUA SENHA AQUI',
    database: 'cadastro_db'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL com o ID:', db.threadId);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

app.post('/cadastrar_usuario', (req, res) => {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
        return res.status(400).send('Erro: Todos os campos são obrigatórios.');
    }

    const sql = 'INSERT INTO usuarios (nome, email, cpf) VALUES (?, ?, ?)';
    const valores = [nome, email, cpf];

    db.query(sql, valores, (err, resultado) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);

            if (err.code === 'ER_DUP_ENTRY') {
                 return res.status(409).send('<h1>Erro de Cadastro</h1><p>E-mail ou CPF já cadastrado!</p><a href="/">Voltar</a>');
            }
            return res.status(500).send('<h1>Erro no Servidor</h1><p>Erro ao cadastrar usuário. Tente novamente.</p>');
        }

        console.log('Usuário cadastrado com ID:', resultado.insertId);
        res.status(201).send('<h1>Cadastro realizado com sucesso!</h1><p>Dados salvos no banco de dados.</p><a href="/">Voltar</a>');
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});