// server/server.js

const http = require('http');
const bodyParser = require('body-parser'); // Importa body-parser
const { loginHandler } = require('./authController'); // Importa a lógica de login

const hostname = '127.0.0.1';
const port = 3001;

// Cria uma instância do body-parser para JSON
const jsonParser = bodyParser.json();

const server = http.createServer((req, res) => {
    // --- Configuração CORS (MUITO IMPORTANTE!) ---
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Porta padrão do Vite
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    // ---------------------------------------------

    // Roteamento
    if (req.url === '/api/login' && req.method === 'POST') {
        // Usa o body-parser para ler o corpo JSON da requisição
        jsonParser(req, res, () => {
            const { username, password } = req.body;
            loginHandler(req, res, username, password);
        });
        return;
    }

    // Rota GET de exemplo (mantida do código anterior)
    if (req.url === '/api/dados' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mensagem: "Dados protegidos ou públicos." }));
        return;
    }

    // Rota não encontrada
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Nao Encontrado\n');
});

server.listen(port, hostname, () => {
    console.log(`Server rodando em http://${hostname}:${port}/`);
});