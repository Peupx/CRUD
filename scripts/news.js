const API_KEY = "SUA CHAVE API";

function displaySection(articles, containerSelector, newsDivClass = 'News') {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Contêiner não encontrado para o seletor: ${containerSelector}`);
        return;
    }

    const newsDivs = container.querySelectorAll(`.${newsDivClass}`);
    const limit = Math.min(articles.length, newsDivs.length);

    if (articles.length === 0) {
        console.warn(`Nenhum artigo encontrado para ${containerSelector}.`);
        newsDivs[0].innerHTML = '<h4>Nenhuma notícia encontrada. Verifique sua chave API.</h4>'; 
        return;
    }
    
    for (let i = 0; i < limit; i++) {
        const article = articles[i];
        const newsDiv = newsDivs[i];

        const newsHtml = `
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                <img 
                    src="${article.urlToImage || 'placeholder.jpg'}" // Fallback para imagem
                    alt="${article.title || 'Imagem da notícia'}"
                >
                <div class="news-info">
                    <h4>${article.title || 'Título indisponível'}</h4>
                    <p>${article.description || 'Clique para ler mais...'}</p>
                </div>
            </a>
            <span class="source">${article.source ? article.source.name : 'Fonte Desconhecida'}</span>
        `;

        newsDiv.innerHTML = newsHtml;
        newsDiv.classList.add('populated-news'); 
    }
}


function fetchNews(query, containerSelector, language = '') {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${API_KEY}${language ? '&language=' + language : ''}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const apiMessage = errorData.message || response.statusText;
                    throw new Error(`Erro API: ${response.status} - ${apiMessage} | Query: ${query}`);
                }).catch(() => {
                    throw new Error(`Erro HTTP: ${response.status} | Query: ${query}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok') {
                throw new Error(`Status da resposta inválido: ${data.status} | Query: ${query}`);
            }
            displaySection(data.articles, containerSelector);
        })
        .catch(error => {
            console.error(`FALHA ao carregar a seção ${containerSelector}:`, error);
            const container = document.querySelector(containerSelector);
            if (container) {
                container.innerHTML = `
                    <p style="color: red;">Erro ao carregar notícias. Detalhes no console.</p>
                `;
            }
        });
}


fetchNews('tesla', '#News .News-Container');
fetchNews('Brasil', '#Brasil .Brasil-Container', 'pt');
fetchNews('World news', '#Internacional .Internacional-Container');
fetchNews('Sports', '#Esportes .Esportes-Container');
fetchNews('Politics', '#Politica .Politica-Container');