const ServicoController = require("../controllers/ServicoController");
const parseBody = require("../utils/bodyParser");

module.exports = async function(req, res) {
    const { method, url } = req;

    if (method === "GET" && url === "/servicos") {
        return ServicoController.listar(req, res);
    }

    if (method === "POST" && url === "/servicos") {
        const body = await parseBody(req);
        return ServicoController.criar(req, res, body);
    }

    if (method === "PUT" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return ServicoController.atualizar(req, res, id, body);
    }

    if (method === "DELETE" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        return ServicoController.deletar(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de serviço não encontrada" }));
};
