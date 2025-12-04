/**
 * ServiceGate - Handler/Router de Agendamentos
 * -------------------------------------------------
 * Responsável por:
 * 1. Capturar requisições HTTP na rota /agendamentos.
 * 2. Aplicar a autenticação e autorização (Role Check para 'empresa').
 * 3. Anexar o empresa_id do token à requisição para segurança.
 * 4. Roteamento manual para os métodos do AgendamentoController.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const AgendamentoController = require("../controllers/AgendamentoController");
const parseBody = require("../utils/bodyParser");
const auth = require("../utils/authMiddleware");
const { send, notFound } = require("../utils/sendResponse");

module.exports = async function(req, res) {
    const { method, url } = req;
    const authData = auth(req, res);

    if (authData.error || authData.user.role !== "empresa") {
        return send(res, 401, { error: "Apenas empresas autenticadas podem acessar agendamentos" });
    }

    const empresa_id = authData.user.id; 

    // ROTEAMENTO: GET /agendamentos
    if (method === "GET" && url === "/agendamentos") {
        return AgendamentoController.listarPorEmpresa(req, res, empresa_id);
    }

    // ROTEAMENTO: POST /agendamentos
    if (method === "POST" && url === "/agendamentos") {
        const body = await parseBody(req);
        body.empresa_id = empresa_id; 
        return AgendamentoController.criar(req, res, body);
    }

    // ROTEAMENTO: PUT /agendamentos/:id
    if (method === "PUT" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2]; 
        const body = await parseBody(req);
        return AgendamentoController.atualizar(req, res, id, body, empresa_id);
    }

    // ROTEAMENTO: DELETE /agendamentos/:id
    if (method === "DELETE" && url.match(/^\/agendamentos\/\d+$/)) {
        const id = url.split("/")[2]; 
        return AgendamentoController.deletar(req, res, id, empresa_id);
    }

    notFound(res, "Rota de agendamento não encontrada");
};