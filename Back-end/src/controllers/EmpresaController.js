const EmpresaService = require("../services/EmpresaService");
const { ok, created, serverError } = require("../utils/sendResponse");

const EmpresaController = {
  async listar(req, res) {
    try {
      const empresas = await EmpresaService.listar();
      ok(res, empresas);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      const id = await EmpresaService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const rows = await EmpresaService.atualizar(id, body);
      ok(res, { updated: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id) {
    try {
      const rows = await EmpresaService.deletar(id);
      ok(res, { deleted: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  }
};

module.exports = EmpresaController;
