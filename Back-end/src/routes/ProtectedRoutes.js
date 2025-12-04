const auth = require("../utils/authMiddleware");
const parseBody = require("../utils/bodyParser");

// Controllers
const AuthController = require("../controllers/AuthController");
const EmpresaController = require("../controllers/EmpresaController");
const ServicoController = require("../controllers/ServicoController");
const AgendamentoController = require("../controllers/AgendamentoController");
const AdminController = require("../controllers/AdminController");

// Exporta um objeto com grupos de rotas
module.exports = {

    // =========================
    // ROTAS DE AUTH
    // =========================
    auth: async function (req, res) {
        const { method, url } = req;

        if (method === "POST" && url === "/auth/login") {
            const body = await parseBody(req);
            return AuthController.login(req, res, body);
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota de auth não encontrada" }));
    },

    // =========================
    // ROTAS DE EMPRESAS
    // =========================
    empresas: async function (req, res) {
        const { method, url } = req;

        // GET /empresas (só admin)
        if (method === "GET" && url === "/empresas") {
            const authData = auth(req, res);
            if (authData.error || authData.user.role !== "admin") {
                res.writeHead(403);
                return res.end(JSON.stringify({ error: "Apenas admins podem listar empresas" }));
            }
            return EmpresaController.listar(req, res);
        }

        // POST /empresas (público - cadastro)
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
    },

    // =========================
    // ROTAS DE SERVIÇOS (empresa)
    // =========================
    servicos: async function (req, res) {
        const { method, url } = req;
        const authData = auth(req, res);

        if (authData.error || authData.user.role !== "empresa") {
            res.writeHead(401);
            return res.end(JSON.stringify({ error: "Apenas empresas autenticadas podem acessar serviços" }));
        }

        const empresa_id = authData.user.id;

        if (method === "GET" && url === "/servicos") {
            return ServicoController.listar(req, res, empresa_id);
        }

        if (method === "POST" && url === "/servicos") {
            const body = await parseBody(req);
            body.empresa_id = empresa_id;
            return ServicoController.criar(req, res, body);
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

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota de serviço não encontrada" }));
    },

    // =========================
    // ROTAS DE AGENDAMENTOS (empresa)
    // =========================
    agendamentos: async function (req, res) {
        const { method, url } = req;
        const authData = auth(req, res);

        if (authData.error || authData.user.role !== "empresa") {
            res.writeHead(401);
            return res.end(JSON.stringify({ error: "Apenas empresas autenticadas podem acessar agendamentos" }));
        }

        const empresa_id = authData.user.id;

        if (method === "GET" && url === "/agendamentos") {
            return AgendamentoController.listarPorEmpresa(req, res, empresa_id);
        }

        if (method === "POST" && url === "/agendamentos") {
            const body = await parseBody(req);
            body.empresa_id = empresa_id;
            return AgendamentoController.criar(req, res, body);
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

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota de agendamento não encontrada" }));
    },

    admin: async function (req, res) {
        const { method, url } = req;
        const authData = auth(req, res);

        if (authData.error || authData.user.role !== "admin") {
            res.writeHead(403);
            return res.end(JSON.stringify({ error: "Apenas admins podem acessar" }));
        }

        if (method === "GET" && url === "/admins") {
            return AdminController.listar(req, res);
        }

        if (method === "POST" && url === "/admins") {
            const body = await parseBody(req);
            return AdminController.criar(req, res, body);
        }

        if (method === "PUT" && url.match(/^\/admins\/\d+$/)) {
            const id = parseInt(url.split("/")[2], 10);
            const body = await parseBody(req);
            return AdminController.atualizar(req, res, id, body);
        }

        if (method === "DELETE" && url.match(/^\/admins\/\d+$/)) {
            const id = parseInt(url.split("/")[2], 10);
            return AdminController.deletar(req, res, id);
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota de admin não encontrada" }));
    }
};
