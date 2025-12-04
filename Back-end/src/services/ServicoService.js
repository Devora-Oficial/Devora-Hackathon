/**
 * ServiceGate - Serviço Service
 * -------------------------------------------------
 * Responsável por operações de acesso e manipulação de dados 
 * na tabela 'servicos' do banco de dados (CRUD), incluindo 
 * métodos de busca e listagem específicos por Empresa (FK: empresa_id).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */

const ServicoModel = require("../models/ServicoModel");

const ServicoService = {
  async listar() {
    return await ServicoModel.listar();
  },

  async listarPorEmpresa(empresa_id) {
    if (!empresa_id) throw new Error("ID da empresa é obrigatório.");
    return await ServicoModel.listarPorEmpresa(empresa_id);
  },

  async buscarPorId(id) {
    if (!id) throw new Error("ID do serviço é obrigatório.");
    return await ServicoModel.buscarPorId(id);
  },

  async criar(dados) {
    if (!dados?.empresa_id || !dados?.nome || !dados?.valor) {
      throw new Error("Dados incompletos para criar um serviço.");
    }
    if (typeof dados.valor !== 'number' || dados.valor <= 0) {
        throw new Error("O valor do serviço deve ser um número positivo.");
    }
    return await ServicoModel.criar(dados);
  },

  async atualizar(id, dados) {
    if (!id) throw new Error("ID do serviço é obrigatório.");
    return await ServicoModel.atualizar(id, dados);
  },

  async deletar(id) {
    if (!id) throw new Error("ID do serviço é obrigatório.");
    return await ServicoModel.deletar(id);
  }
};

module.exports = ServicoService;
