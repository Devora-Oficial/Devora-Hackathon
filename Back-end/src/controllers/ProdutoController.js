const ProdutoService = require("../services/ProdutoService");
const bodyParser = require("../utils/bodyParser");

module.exports = {
    async listar(req, res) {
        const produtos = await ProdutoService.listar();
        res.end(JSON.stringify(produtos));
    },

    async criar(req, res) {
        const body = await bodyParser(req);
        const novo = await ProdutoService.criar(body);

        res.writeHead(201);
        res.end(JSON.stringify(novo));
    }
};
