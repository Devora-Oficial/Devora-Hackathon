/**
 * ServiceGate - Roteador Central (Main Handler)
 * -------------------------------------------------
 * Responsável por:
 * 1. Definir e agrupar todos os Handlers de rotas (Auth, Empresas, Serviços, Agendamentos).
 * 2. Direcionar o tráfego HTTP para o Handler de rota correto.
 * 3. Centralizar imports de middlewares e controllers.
 * 4. Garantir que o body da requisição seja lido (parseBody) antes de chamar o Controller.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const auth = require("../utils/authMiddleware");
const parseBody = require("../utils/bodyParser"); 
const { ok, created, badRequest, serverError, notFound, forbidden, send } = require("../utils/sendResponse");

// Controllers
const AuthController = require("../controllers/AuthController");
const EmpresaController = require("../controllers/EmpresaController");
const ServicoController = require("../controllers/ServicoController");
const AgendamentoController = require("../controllers/AgendamentoController");

// Função auxiliar para evitar repetição
function handleAuthFailure(res, authData) {
    // Se authData for null ou não tiver o objeto user, a autenticação falhou.
    if (!authData || !authData.user) {
        // Se os headers ainda não foram enviados pelo middleware, envia 401 agora.
        if (!res.headersSent) {
            res.writeHead(401);
            res.end(JSON.stringify({ error: "Acesso não autorizado, token inválido ou sessão expirada." }));
        }
        return true; // Falha na autenticação
    }
    return false; // Sucesso na autenticação
}

// Exporta um objeto com grupos de rotas
module.exports = {

    // =========================
    // ROTAS DE AUTH
    // =========================
    auth: async function(req, res) {
        const { method, url } = req;

        if (method === "POST" && url === "/auth/login") {
            const body = await parseBody(req); 
            return AuthController.login(req, res, body);
        }

        notFound(res, "Rota de auth não encontrada"); 
    },
    // =========================
    // ROTAS DE EMPRESAS
    // =========================
    empresas: async function(req, res) {
        const { method, url } = req;

        // POST /empresas (público - cadastro)
        if (method === "POST" && url === "/empresas") {
            const body = await parseBody(req);
            return EmpresaController.criar(req, res, body);
        }
        
        // GET /empresas (só admin)
        if (method === "GET" && url === "/empresas") {
            const authData = auth(req, res);
            
            // ✅ CORREÇÃO 1: Trata falhas de autenticação e crash (authData.user undefined)
            if (handleAuthFailure(res, authData)) {
                return;
            }
            
            if (authData.user.role !== "admin") {
                return forbidden(res, "Apenas admins podem listar empresas");
            }
            return EmpresaController.listar(req, res);
        }

        // PUT /empresas/:id
        if (method === "PUT" && url.match(/^\/empresas\/\d+$/)) {
            const authData = auth(req, res);
            
            // ✅ CORREÇÃO 2: Trata falhas de autenticação e crash (authData.user undefined)
            if (handleAuthFailure(res, authData)) {
                return;
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
            
            // ✅ CORREÇÃO 3: Trata falhas de autenticação e crash (authData.user undefined)
            if (handleAuthFailure(res, authData)) {
                return;
            }
            
            if (authData.user.role !== "admin") {
                return forbidden(res, "Apenas admins podem excluir empresas"); 
            }
            const id = parseInt(url.split("/")[2], 10);
            return EmpresaController.deletar(req, res, id);
        }

        notFound(res, "Rota de empresa não encontrada"); 
    },
    // =========================
    // ROTAS DE SERVIÇOS (empresa)
    // =========================
    servicos: async function(req, res) {
        const { method, url } = req;
        const authData = auth(req, res);

        // ✅ CORREÇÃO 4 (Fix do crash): Trata falhas de autenticação e crash (authData.user undefined)
        if (handleAuthFailure(res, authData)) {
            return;
        }
        
        // Agora é seguro acessar authData.user.role
        if (authData.user.role !== "empresa") {
            return forbidden(res, "Apenas admins podem excluir empresas"); 
        }

        const empresa_id = authData.user.id;
        
        // POST /servicos
        if (method === "POST" && url === "/servicos") {
            const body = await parseBody(req);
            body.empresa_id = empresa_id;
            return ServicoController.criar(req, res, body);
        }

        if (method === "GET" && url === "/servicos") {
            return ServicoController.listar(req, res, empresa_id);
        }

        if (method === "PUT" && url.match(/^\/servicos\/\d+$/)) {
            const id = url.split("/")[2];
            const body = await parseBody(req);
            return ServicoController.atualizar(req, res, id, body, empresa_id);
        }

        if (method === "DELETE" && url.match(/^\/servicos\/\d+$/)) {
            const id = url.split("/")[2];
            return ServicoController.deletar(req, res, id, empresa_id);
        }

        notFound(res, "Rota de serviço não encontrada"); 
    },
    // =========================
    // ROTAS DE AGENDAMENTOS (empresa)
    // =========================
    agendamentos: async function(req, res) {
        const { method, url } = req;
        
        const authData = auth(req, res);

        // ✅ CORREÇÃO 5: Trata falhas de autenticação e crash (authData.user undefined)
        if (handleAuthFailure(res, authData)) {
            return;
        }
        
        if (authData.user.role !== "empresa") {
            return send(res, 401, { error: "Apenas empresas autenticadas podem acessar agendamentos" });
        }

        const empresa_id = authData.user.id;

        // POST /agendamentos
        if (method === "POST" && url === "/agendamentos") {
            const body = await parseBody(req);
            body.empresa_id = empresa_id;
            return AgendamentoController.criar(req, res, body);
        }
        
        if (method === "GET" && url === "/agendamentos") {
            return AgendamentoController.listarPorEmpresa(req, res, empresa_id);
        }

        if (method === "PUT" && url.match(/^\/agendamentos\/\d+$/)) {
            const id = url.split("/")[2];
            const body = await parseBody(req);
            return AgendamentoController.atualizar(req, res, id, body, empresa_id);
        }

        if (method === "DELETE" && url.match(/^\/agendamentos\/\d+$/)) {
            const id = url.split("/")[2];
            return AgendamentoController.deletar(req, res, id, empresa_id);
        }

        notFound(res, "Rota de agendamento não encontrada");
    }
};