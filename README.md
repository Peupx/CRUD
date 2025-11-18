# 🚀 Guia de Instalação e Execução

Este guia rápido explica como configurar e executar a aplicação web desenvolvida com **Node.js**, **Express** e **MySQL**.

---

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** e **npm** – utilizados para rodar o servidor Express.
- **MySQL Server** – banco de dados da aplicação.

---

## 📦 Instalação dos Pacotes Node.js

No diretório raiz do projeto, execute:

```bash
 npm init -y
```

Para instalar os pacotes necessários para rodar a aplicação digite no mesmo terminal:

```bash
 npm install express mysql2 body-parser
```

## ⚙️ Configuração do Banco de Dados MySQL e API

A aplicação depende de uma conexão funcional com o MySQL.

### 1. Criação do Banco

Certifique-se de que o banco de dados **`cadastro_db`** exista em seu servidor MySQL.

---

## 2. Configurações de Acesso

Atualize as credenciais de acesso no arquivo do servidor `processar_form.js` para corresponder ao seu ambiente local.

```javascript
// Exemplo de configuração no servidor
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SUA SENHA AQUI', // substitua pela sua senha local
    database: 'cadastro_db'
});
```

## 3. Configuração da API

Antes de executar a aplicação pegue sua chave no site [https://newsapi.org](https://newsapi.org) e coloque no campo constAPI_KEY no arquivo `news.js`

```javascript
const API_KEY = "SUA CHAVE API";
```

## ▶️ Execução da Aplicação

Após instalar os pacotes e configurar o banco de dados, inicie o servidor Node.js.

### 🔧 Iniciar o servidor

```bash
node processar_form.js
```

Certifique-se de que está na pasta correta antes de fazer isso.

## 📜 Verificação do log

Ao iniciar, você deve ver algo semelhante no terminal:

✅ Conectado ao MySQL com o ID: [ID do thread] `<br>`
Servidor rodando em [http://localhost:3000](http://localhost:3000)
