const EmpresaController = require("../controllers/EmpresaController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");

module.exports = async function(req, res) {
    const { method, url } = req;

    // GET /empresas (somente admin)
    if (method === "GET" && url === "/empresas") {
        const authData = auth(req, res);
        if (authData.error || authData.user.role !== "admin") {
            res.writeHead(403);
            return res.end(JSON.stringify({ error: "Apenas admins podem listar empresas" }));
        }
        return EmpresaController.listar(req, res);
    }

    // POST /empresas (público)
    if (method === "POST" && url === "/empresas") {
        const body = await parseBody(req);
        return EmpresaController.criar(req, res, body);
    }

    // PUT /empresas/:id
    if (method === "PUT" && url.match(/^\/empresas\/\d+$/)) {
        const authData = auth(req, res);
        if (authData.error) {
            res.writeHead(401);
            return res.end(JSON.stringify({ error: authData.message }));
        }

        const id = parseInt(url.split("/")[2], 10);
        
        if (authData.user.role !== "admin" && authData.user.id !== id) {
            res.writeHead(403);
            return res.end(JSON.stringify({ error: "Sem permissão" }));
        }

        const body = await parseBody(req);
        return EmpresaController.atualizar(req, res, id, body);
    }

    // DELETE /empresas/:id (admin)
    if (method === "DELETE" && url.match(/^\/empresas\/\d+$/)) {
        const authData = auth(req, res);
        if (authData.error || authData.user.role !== "admin") {
            res.writeHead(403);
            return res.end(JSON.stringify({ error: "Apenas admins podem excluir empresas" }));
        }
        const id = parseInt(url.split("/")[2], 10);
        return EmpresaController.deletar(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de empresa não encontrada" }));
};
