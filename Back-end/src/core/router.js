// src/core/router.js
const empresaRoutes = require("../routes/EmpresaRoutes");
const servicoRoutes = require("../routes/ServicoRoutes");
const agendamentoRoutes = require("../routes/AgendamentoRoutes");
const authRoutes = require("../routes/authRoutes");

module.exports = {
    async handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        // Healthcheck
        if (req.url === "/" && req.method === "GET") {
            return res.end(JSON.stringify({ status: "ok", message: "Servidor rodando" }));
        }

        // Login
        if (req.url.startsWith("/auth")) {
            return authRoutes(req, res);
        }

        if (req.url.startsWith("/empresas")) {
            return empresaRoutes(req, res);
        }

        if (req.url.startsWith("/servicos")) {
            return servicoRoutes(req, res);
        }

        if (req.url.startsWith("/agendamentos")) {
            return agendamentoRoutes(req, res);
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
};
