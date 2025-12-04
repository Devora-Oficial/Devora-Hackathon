/**
 * ServiceGate - Controllers de Serviço
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'servicos'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernades (Desenvolvimento Backend)
 */

const ServicoService = require("../services/ServicoService");
const { ok, created, serverError, badRequest } = require("../utils/sendResponse");

const ServicoController = {
  async listar(req, res) {
    try {
      const servicos = await ServicoService.listar();
      ok(res, servicos);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      // Exemplo de validação de campos obrigatórios (ajuste conforme seu model!)
      if (!body.nome || !body.valor) { 
        return badRequest(res, "Campos 'nome' e 'valor' são obrigatórios");
      }
      
      const id = await ServicoService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const rows = await ServicoService.atualizar(id, body);
      ok(res, { updated: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id) {
    try {
      const rows = await ServicoService.deletar(id);
      ok(res, { deleted: rows });
    } catch (err) {
      serverError(res, err.message);
    }
  }
};

module.exports = ServicoController;
