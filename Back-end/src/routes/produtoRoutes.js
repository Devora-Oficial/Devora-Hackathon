const ProdutoController = require("../controllers/ProdutoController");

module.exports = async (req, res) => {
    if (req.url === "/produtos" && req.method === "GET") {
        return ProdutoController.listar(req, res);
    }

    if (req.url === "/produtos" && req.method === "POST") {
        return ProdutoController.criar(req, res);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de produto não encontrada" }));
};
