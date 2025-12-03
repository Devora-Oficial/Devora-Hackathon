const produtoRoutes = require("./routes/ProdutoRoutes");

module.exports = {
    handle(req, res) {
        res.setHeader("Content-Type", "application/json");

        // Rota de saúde do servidor
        if (req.url === "/") {
            res.end(JSON.stringify({ status: "ok", message: "Servidor rodando" }));
            return;
        }

        // Rotas de produto
        if (req.url.startsWith("/produtos")) {
            produtoRoutes(req, res);
            return;
        }

        // Caso nenhuma rota exista
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
};
