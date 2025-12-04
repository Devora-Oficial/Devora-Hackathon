const AgendamentoService = require("../services/AgendamentoService");
const { ok, created, serverError } = require("../utils/sendResponse");

const AgendamentoController = {
  async listarPorEmpresa(req, res, empresa_id) {
    try {
      const agendamentos = await AgendamentoService.listarPorEmpresa(empresa_id);
      ok(res, agendamentos);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      const id = await AgendamentoService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const affected = await AgendamentoService.atualizar(id, body);
      ok(res, { affected });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id) {
    try {
      const affected = await AgendamentoService.deletar(id);
      ok(res, { affected });
    } catch (err) {
      serverError(res, err.message);
    }
  }
};

module.exports = AgendamentoController;
