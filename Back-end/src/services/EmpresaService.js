const EmpresaModel = require("../models/EmpresaModel");

const EmpresaService = {
  async listar() {
    return await EmpresaModel.listar();
  },

  async buscarPorId(id) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    return await EmpresaModel.buscarPorId(id);
  },

  async criar(dados) {
    if (!dados?.nome || !dados?.email || !dados?.senha) {
      throw new Error("Dados incompletos para criar a empresa.");
    }
    return await EmpresaModel.criar(dados);
  },

  async atualizar(id, dados) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    return await EmpresaModel.atualizar(id, dados);
  },

  async deletar(id) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    return await EmpresaModel.deletar(id);
  }
};

module.exports = EmpresaService;
