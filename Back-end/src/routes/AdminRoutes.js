// src/routes/AdminRoutes.js
const AdminController = require("../controllers/AdminController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");

module.exports = async function(req, res) {
    const { method, url } = req;

    // Middleware de autenticação
    const authData = auth(req, res);
    if (authData.error || authData.user.role !== "admin") {
        res.writeHead(403);
        return res.end(JSON.stringify({ error: "Acesso permitido apenas para admins" }));
    }

    // GET /admins
    if (method === "GET" && url === "/admins") {
        return AdminController.listar(req, res);
    }

    // POST /admins
    if (method === "POST" && url === "/admins") {
        const body = await parseBody(req);
        return AdminController.criar(req, res, body);
    }

    // PUT /admins/:id
    if (method === "PUT" && url.match(/^\/admins\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return AdminController.atualizar(req, res, id, body);
    }

    // DELETE /admins/:id
    if (method === "DELETE" && url.match(/^\/admins\/\d+$/)) {
        const id = url.split("/")[2];
        return AdminController.deletar(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de admin não encontrada" }));
};
