const ServicoService = require("../services/ServicoService");
const { ok, created, serverError } = require("../utils/sendResponse");

const ServicoController = {
  // Recebe empresa_id como terceiro argumento (vindo do routes.js)
  async listar(req, res, empresa_id) {
    try {
      // MUDANÇA: Chama o método específico para listar apenas daquela empresa
      const servicos = await ServicoService.listarPorEmpresa(empresa_id);
      ok(res, servicos);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      const id = await ServicoService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body, empresa_id) {
    try {
      // Idealmente, você verificaria se o serviço pertence à empresa antes de atualizar
      const rows = await ServicoService.atualizar(id, body);
      ok(res, { updated: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id, empresa_id) {
    try {
      const rows = await ServicoService.deletar(id);
      ok(res, { deleted: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  }
};

module.exports = ServicoController;
