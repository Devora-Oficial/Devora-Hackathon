/**
 * ServiceGate - Handler/Router de Serviços
 * -------------------------------------------------
 * Responsável por:
 * 1. Capturar requisições HTTP na rota /servicos.
 * 2. Aplicar a autenticação e autorização (Role Check para 'empresa').
 * 3. Anexar o empresa_id do token à requisição para segurança.
 * 4. Roteamento manual para os métodos do ServicoController.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const ServicoController = require("../controllers/ServicoController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");
const { send, notFound } = require("../utils/sendResponse");

module.exports = async function(req, res) {
    const { method, url } = req;
    const authData = auth(req, res);

    if (authData.error || authData.user.role !== "empresa") {
        return send(res, 401, { error: "Apenas empresas autenticadas podem acessar serviços" });
    }

    const empresa_id = authData.user.id;

    // ROTEAMENTO: GET /servicos
    if (method === "GET" && url === "/servicos") {
        return ServicoController.listar(req, res, empresa_id);
    }

    // ROTEAMENTO: POST /servicos
    if (method === "POST" && url === "/servicos") {
        const body = await parseBody(req);
        body.empresa_id = empresa_id;
        return ServicoController.criar(req, res, body);
    }

    // ROTEAMENTO: PUT /servicos/:id
    if (method === "PUT" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        const body = await parseBody(req);
        return ServicoController.atualizar(req, res, id, body, empresa_id);
    }

    // ROTEAMENTO: DELETE /servicos/:id
    if (method === "DELETE" && url.match(/^\/servicos\/\d+$/)) {
        const id = url.split("/")[2];
        return ServicoController.deletar(req, res, id, empresa_id);
    }

    notFound(res, "Rota de serviço não encontrada");
};