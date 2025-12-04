const ProtectedRoutes = require("../routes/ProtectedRoutes");

module.exports = {
    async handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        const { url, method } = req;

        // ---------------------------
        // 🚀 Healthcheck
        // ---------------------------
        if (url === "/" && method === "GET") {
            return res.end(JSON.stringify({
                status: "ok",
                message: "Servidor rodando"
            }));
        }

        // ---------------------------
        // 🔐 Autenticação
        // ---------------------------
        if (url.startsWith("/auth")) {
            return ProtectedRoutes.auth(req, res);
        }

        // ---------------------------
        // 🏢 Empresas
        // ---------------------------
        if (url.startsWith("/empresas")) {
            return ProtectedRoutes.empresas(req, res);
        }

        // ---------------------------
        // 🛠️ Serviços
        // ---------------------------
        if (url.startsWith("/servicos")) {
            return ProtectedRoutes.servicos(req, res);
        }

        // ---------------------------
        // 📅 Agendamentos
        // ---------------------------
        if (url.startsWith("/agendamentos")) {
            return ProtectedRoutes.agendamentos(req, res);
        }

        // ---------------------------
        // ❌ Rota não encontrada
        // ---------------------------
        res.writeHead(404);
        return res.end(JSON.stringify({
            error: "Rota não encontrada"
        }));
    }
};
