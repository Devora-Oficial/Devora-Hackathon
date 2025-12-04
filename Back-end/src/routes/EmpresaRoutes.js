/**
 * ServiceGate - Handler/Router de Empresas
 * -------------------------------------------------
 * Responsável por:
 * 1. Capturar requisições HTTP na rota /empresas.
 * 2. Aplicar regras de autorização:
 * - GET e DELETE: Somente 'admin'.
 * - PUT: 'admin' OU a própria empresa (ID do token deve ser igual ao ID da rota).
 * - POST: Rota pública (cadastro).
 * 3. Roteamento manual para os métodos do EmpresaController.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const EmpresaController = require("../controllers/EmpresaController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");
const { ok, created, badRequest, serverError, notFound, forbidden, send } = require("../utils/sendResponse");


module.exports = async function(req, res) {
    const { method, url } = req;

    // GET /empresas (somente admin)
    if (method === "GET" && url === "/empresas") {
        const authData = auth(req, res);
        if (authData.error || authData.user.role !== "admin") {
            return forbidden(res, "Apenas admins podem listar empresas");
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
            return send(res, 401, { error: authData.message });
        }

        const id = parseInt(url.split("/")[2], 10);
        
        if (authData.user.role !== "admin" && authData.user.id !== id) {
            return forbidden(res, "Sem permissão");
        }

        const body = await parseBody(req);
        return EmpresaController.atualizar(req, res, id, body);
    }

    // DELETE /empresas/:id (admin)
    if (method === "DELETE" && url.match(/^\/empresas\/\d+$/)) {
        const authData = auth(req, res);
        if (authData.error || authData.user.role !== "admin") {
            return forbidden(res, "Apenas admins podem excluir empresas");
        }
        const id = parseInt(url.split("/")[2], 10);
        return EmpresaController.deletar(req, res, id);
    }

    notFound(res, "Rota de empresa não encontrada");
};