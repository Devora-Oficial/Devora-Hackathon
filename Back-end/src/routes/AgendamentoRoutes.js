const AgendamentoController = require("../controllers/AgendamentoController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");

module.exports = async function(req, res) {
    const { method, url } = req;
    const authData = auth(req, res);

    if (authData.error || authData.user.role !== "empresa") {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: "Apenas empresas autenticadas podem acessar agendamentos" }));
    }

    const empresa_id = authData.user.id;

    // GET /agendamentos
    if (method === "GET" && url === "/agendamentos") {
        return AgendamentoController.listarPorEmpresa(req, res, empresa_id);
    }

    // POST /agendamentos
    if (method === "POST" && url === "/agendamentos") {
        const body = await parseBody(req);
        body.empresa_id = empresa_id;
        return AgendamentoController.criar(req, res, body);
    }

    // PUT /agendamentos/:id
    if (method === "PUT" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return AgendamentoController.atualizar(req, res, id, body, empresa_id);
    }

    // DELETE /agendamentos/:id
    if (method === "DELETE" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2];
        return AgendamentoController.deletar(req, res, id, empresa_id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de agendamento não encontrada" }));
};
