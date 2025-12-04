/**
 * ServiceGate - Agendamento Service
 * -------------------------------------------------
 * Responsável por regras de negócio e acesso ao banco de dados 
 * para a entidade 'Agendamento' (criação, listagem por empresa, 
 * atualização e deleção).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */

const AgendamentoModel = require("../models/AgendamentoModel");

const AgendamentoService = {
  async listarPorEmpresa(empresa_id) {
    if (!empresa_id) throw new Error("ID da empresa é obrigatório.");
    return await AgendamentoModel.listarPorEmpresa(empresa_id);
  },

  async buscarPorId(id) {
    if (!id) throw new Error("ID do agendamento é obrigatório.");
    return await AgendamentoModel.buscarPorId(id);
  },

  async criar(dados) {
    if (!dados || !dados.empresa_id || !dados.servico_id || !dados.data_hora) {
      throw new Error("Dados incompletos para criar agendamento.");
    }
    return await AgendamentoModel.criar(dados);
  },

  async atualizar(id, dados) {
    if (!id) throw new Error("ID do agendamento é obrigatório.");
    return await AgendamentoModel.atualizar(id, dados);
  },

  async deletar(id) {
    if (!id) throw new Error("ID do agendamento é obrigatório.");
    return await AgendamentoModel.deletar(id);
  }
};

module.exports = AgendamentoService;
