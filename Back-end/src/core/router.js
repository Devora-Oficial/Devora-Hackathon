const ProtectedRoutes = require("../routes/ProtectedRoutes");

module.exports = {
    async handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        // Healthcheck
        if (req.url === "/" && req.method === "GET") {
            return res.end(JSON.stringify({ status: "ok", message: "Servidor rodando" }));
        }

        // Auth
        if (req.url.startsWith("/auth")) {
            return ProtectedRoutes.auth(req, res);
        }

        // Empresas
        if (req.url.startsWith("/empresas")) {
            return ProtectedRoutes.empresas(req, res);
        }

        // Serviços
        if (req.url.startsWith("/servicos")) {
            return ProtectedRoutes.servicos(req, res);
        }

        // Agendamentos
        if (req.url.startsWith("/agendamentos")) {
            return ProtectedRoutes.agendamentos(req, res);
        }

        // Admin
        if (req.url.startsWith("/admins")) {
            return ProtectedRoutes.admin(req, res);
        }


        // Rota não encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
};
