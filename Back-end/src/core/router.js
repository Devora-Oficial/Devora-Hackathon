/**
 * ServiceGate - Roteador Central (Core Router)
 * -------------------------------------------------
 * Responsável por:
 * 1. Receber o controle do servidor principal (server.js).
 * 2. Aplicar cabeçalhos globais (Content-Type).
 * 3. Gerenciar rotas de primeiro nível (healthcheck, /auth, /empresas, etc.).
 * 4. Delegar a requisição ao Handler específico dentro de ProtectedRoutes.
 *
 * NOTA: Este roteador pressupõe que o 'body' da requisição já foi lido e processado
 * pelo middleware no arquivo server.js.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */
 
const ProtectedRoutes = require("../routes/ProtectedRoutes");
const { notFound, ok } = require("../utils/sendResponse");

module.exports = {
    async handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        const { url, method } = req;

        // ---------------------------
        // Healthcheck (Rota Pública)
        // ---------------------------
        if (url === "/" && method === "GET") {
            return ok(res, {
                status: "ok",
                message: "Servidor rodando"
            });
        }

        // ---------------------------
        // Roteamento para Handlers
        // ---------------------------
        if (url.startsWith("/auth")) {
            return ProtectedRoutes.auth(req, res);
        }

        if (url.startsWith("/empresas")) {
            return ProtectedRoutes.empresas(req, res);
        }

        if (url.startsWith("/servicos")) {
            return ProtectedRoutes.servicos(req, res);
        }

        if (url.startsWith("/agendamentos")) {
            return ProtectedRoutes.agendamentos(req, res);
        }

        // ---------------------------
        //  Rota não encontrada (404)
        // ---------------------------
        notFound(res, "Rota não encontrada");
    }
};