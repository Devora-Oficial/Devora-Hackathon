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
const { ok, created, serverError, badRequest, forbidden } = require("../utils/sendResponse");

const ServicoController = {
  
  handleError(res, err) {
    const businessErrors = ["obrigatório", "Acesso negado", "não encontrado", "incompleto", "inválido", "positivo"];
    
    if (err.message.includes("Acesso negado")) {
        return forbidden(res, err.message);
    }
    
    if (businessErrors.some(keyword => err.message.includes(keyword))) {
      return badRequest(res, err.message);
    }
    
    console.error(err);
    serverError(res, "Erro interno do servidor.");
  },
  
  async listar(req, res, empresa_id) {
    try {
      const servicos = await ServicoService.listarPorEmpresa(empresa_id);
      ok(res, servicos);
    } catch (err) {
      ServicoController.handleError(res, err);
    }
  },

  async criar(req, res, body) {
    try {
      if (!body.nome || !body.valor) { 
        return badRequest(res, "Campos 'nome' e 'valor' são obrigatórios");
      }
      
      const id = await ServicoService.criar(body);
      created(res, { id });
    } catch (err) {
      ServicoController.handleError(res, err);
    }
  },

  async atualizar(req, res, id, body, empresa_id) {
    try {
      const rows = await ServicoService.atualizar(id, body, empresa_id);
      ok(res, { updated: rows });
    } catch (err) {
      ServicoController.handleError(res, err);
    }
  },

  async deletar(req, res, id, empresa_id) {
    try {
      const rows = await ServicoService.deletar(id, empresa_id);
      ok(res, { deleted: rows });
    } catch (err) {
      ServicoController.handleError(res, err);
    }
  }
};

module.exports = ServicoController;