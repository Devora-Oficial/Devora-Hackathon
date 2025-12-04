/**
 * ServiceGate - Controllers  de Agendamentos
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'agendamentos'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernado (Desenvolvimento Backend)
 */

const AgendamentoService = require("../services/AgendamentoService");
// Importando o badRequest agora!
const { ok, created, serverError, badRequest } = require("../utils/sendResponse"); 

const STATUS_VALIDOS = ["Agendado", "Cancelado", "Concluído"];

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
      body.status = body.status || "Agendado"; // valor padrão

      if (!STATUS_VALIDOS.includes(body.status)) {
        // CORREÇÃO: Usando badRequest (400) do utilitário
        return badRequest(res, "Status inválido para criação de agendamento.");
      }

      const id = await AgendamentoService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      // Adicionando a validação de status aqui também!
      if (body.status && !STATUS_VALIDOS.includes(body.status)) {
         return badRequest(res, "Status inválido para atualização de agendamento.");
      }
      
      const affected = await AgendamentoService.atualizar(id, body);
      ok(res, { affected });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async deletar(req, res, id) {
    try {
      const affected = await AgendamentoService.deletar(id);
      // CORREÇÃO: Usando ok(200) do utilitário
      ok(res, { affected }); 
    } catch (err) {
      // CORREÇÃO: Usando serverError(500) do utilitário
      serverError(res, err.message);
    }
  }
};

module.exports = AgendamentoController;