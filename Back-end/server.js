/**
 * ServiceGate - Servidor HTTP Principal (server.js)
 * -------------------------------------------------
 * Responsável por:
 * 1. Inicializar o servidor HTTP nativo.
 * 2. Aplicar Middlewares Globais (CORS e Body Parser).
 * 3. Gerenciar o fluxo de dados da requisição (Body Chunks).
 * 4. Delegar o controle final para o roteador principal (router.handle).
 * 5. Iniciar a escuta na porta definida.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */

require("dotenv").config();
const http = require("http");
const router = require("./src/core/router"); 

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = "http://localhost:5173"; 

const server = http.createServer((req, res) => {
    
    // === 1. Middleware CORS (Cross-Origin Resource Sharing) ===
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        // Responde ao Pre-flight com sucesso (204 No Content)
        res.writeHead(204); 
        res.end();
        return;
    }

    // === 2. Middleware Body Parser (Leitura de JSON ASSÍNCRONA) ===
    let body = '';
    req.on('data', (chunk) => {
        // Acumula os chunks de dados do corpo da requisição
        body += chunk.toString();
    });
x
    req.on('end', () => {
        // Quando todos os dados foram recebidos, tenta fazer o parse
        try {
            const contentType = req.headers['content-type'];
            if (contentType && contentType.includes('application/json') && body) {
                // Anexa o corpo parseado (o objeto JSON) ao objeto req
                req.body = JSON.parse(body);
            } else {
                req.body = {};
            }
        } catch (error) {
            console.error("Erro ao fazer parse do JSON:", error);
            // Em caso de JSON inválido, o fluxo continua, mas o body fica vazio
            req.body = {};
        }

        // === 3. Roteamento Principal ===
        // O controle é passado ao roteador após a leitura do corpo.
        router.handle(req, res);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor ON em http://localhost:${PORT}`);
});