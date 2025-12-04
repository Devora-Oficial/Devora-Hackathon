const ServicoController = require("../controllers/ServicoController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");

module.exports = async function(req, res) {
    const { method, url } = req;
    const authData = auth(req, res);

    if (authData.error || authData.user.role !== "empresa") {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: "Apenas empresas autenticadas podem acessar serviços" }));
    }

    const empresa_id = authData.user.id;

    // GET /servicos
    if (method === "GET" && url === "/servicos") {
        return ServicoController.listar(req, res, empresa_id);
    }

    // POST /servicos
    if (method === "POST" && url === "/servicos") {
        const body = await parseBody(req);
        body.empresa_id = empresa_id;
        return ServicoController.criar(req, res, body);
    }

    // PUT /servicos/:id
    if (method === "PUT" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return ServicoController.atualizar(req, res, id, body, empresa_id);
    }

    // DELETE /servicos/:id
    if (method === "DELETE" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        return ServicoController.deletar(req, res, id, empresa_id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de serviço não encontrada" }));
};
