const AdminModel = require("../models/AdminModel");
const { hash } = require("../utils/hash");

const AdminService = {
  listar: () => AdminModel.listar(),

  buscarPorId: (id) => AdminModel.buscarPorId ? AdminModel.buscarPorId(id) : null, // caso queira implementar depois

  criar: async (dados) => {
    const { nome, email, senha } = dados;
    if (!nome || !email || !senha) {
      throw new Error("Dados incompletos.");
    }
    return AdminModel.criar({ nome, email, senha });
  },

  atualizar: async (id, dados) => {
    const { nome, email, senha } = dados;
    const updateData = { nome, email };
    if (senha) {
      updateData.senha = await hash(senha);
    }
    if (AdminModel.atualizar) {
      return AdminModel.atualizar(id, updateData);
    }
    throw new Error("Função atualizar não implementada no AdminModel.");
  },

  deletar: async (id) => {
    if (AdminModel.deletar) {
      return AdminModel.deletar(id);
    }
    throw new Error("Função deletar não implementada no AdminModel.");
  }
};

module.exports = AdminService;
