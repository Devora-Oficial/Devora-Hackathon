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
