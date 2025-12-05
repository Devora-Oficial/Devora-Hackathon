require("dotenv").config();
const http = require("http");
const router = require("./src/core/router");

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = "http://localhost:5173"; 

const server = http.createServer((req, res) => {
    
    // === 1. Middleware CORS ===
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204); 
        res.end();
        return;
    }

    // === 2. Middleware Body Parser (Leitura de JSON) ===
    let body = '';
    req.on('data', (chunk) => {
        // Acumula os chunks de dados do corpo da requisição
        body += chunk.toString();
    });

    req.on('end', () => {
        // Quando todos os dados foram recebidos
        try {
            // Verifica se o Content-Type é JSON
            const contentType = req.headers['content-type'];
            if (contentType && contentType.includes('application/json') && body) {
                // Tenta fazer o parse do JSON e armazena em req.body
                req.body = JSON.parse(body);
            } else {
                // Caso não seja JSON ou esteja vazio, define como objeto vazio
                req.body = {};
            }
        } catch (error) {
            console.error("Erro ao fazer parse do JSON:", error);
            // Em caso de erro, define o corpo como vazio e pode retornar um 400
            req.body = {};
        }

        // === 3. Roteamento Principal ===
        // Só chama o roteador depois que o corpo da requisição foi totalmente processado
        router.handle(req, res);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor ON em http://localhost:${PORT}`);
});
