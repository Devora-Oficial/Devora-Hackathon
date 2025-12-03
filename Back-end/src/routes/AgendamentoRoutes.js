const AgendamentoController = require("../controllers/AgendamentoController");
const parseBody = require("../utils/bodyParser");

module.exports = async function(req, res) {
    const { method, url } = req;

    if (method === "GET" && url === "/agendamentos") {
        const empresa_id = req.headers["empresa-id"];
        return AgendamentoController.listarPorEmpresa(req, res, empresa_id);
    }

    if (method === "POST" && url === "/agendamentos") {
        const body = await parseBody(req);
        return AgendamentoController.criar(req, res, body);
    }

    if (method === "PUT" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return AgendamentoController.atualizar(req, res, id, body);
    }

    if (method === "DELETE" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2];
        return AgendamentoController.deletar(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de agendamento não encontrada" }));
};
