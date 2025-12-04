/**
 * ServiceGate - controller de Administradores da Plataforma
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'plataforma_admins'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernado (Desenvolvimento Backend)
 */

const AdminService = require("../services/AdminService");
const { ok, created, serverError } = require("../utils/sendResponse");

const AdminController = {
  async listar(req, res) {
    try {
      const admins = await AdminService.listar();
      ok(res, admins);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      const id = await AdminService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const rows = await AdminService.atualizar(id, body);
      ok(res, { updated: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id) {
    try {
      const rows = await AdminService.deletar(id);
      ok(res, { deleted: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  }
};

module.exports = AdminController;
