/**
 * ServiceGate - Handler/Router de Autenticação (Auth)
 * -------------------------------------------------
 * Responsável por:
 * 1. Capturar requisições HTTP na rota /auth/login.
 * 2. Ler e processar o corpo (body) da requisição (e-mail/senha/tipo).
 * 3. Roteamento para o método de login do AuthController.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const AuthController = require("../controllers/AuthController");
const parseBody = require("../utils/bodyParser"); 
const { notFound } = require("../utils/sendResponse");

module.exports = async function (req, res) {
    const { method, url } = req;

    // ROTEAMENTO: POST /auth/login
    if (method === "POST" && url === "/auth/login") {
        const body = await parseBody(req); 
        return AuthController.login(req, res, body); 
    }

    notFound(res, "Rota de auth não encontrada");
};