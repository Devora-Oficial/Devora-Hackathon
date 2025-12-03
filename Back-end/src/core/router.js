const empresaRoutes = require("./routes/EmpresaRoutes");
const servicoRoutes = require("./routes/ServicoRoutes");
const agendamentoRoutes = require("./routes/AgendamentoRoutes");

module.exports = {
    async handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        // Rota de saúde do servidor
        if (req.url === "/") {
            res.end(JSON.stringify({ status: "ok", message: "Servidor rodando" }));
            return;
        }

        // Rotas de empresas
        if (req.url.startsWith("/empresas")) {
            await empresaRoutes(req, res);
            return;
        }

        // Rotas de serviços
        if (req.url.startsWith("/servicos")) {
            await servicoRoutes(req, res);
            return;
        }

        // Rotas de agendamentos
        if (req.url.startsWith("/agendamentos")) {
            await agendamentoRoutes(req, res);
            return;
        }

        // Caso nenhuma rota exista
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
};
