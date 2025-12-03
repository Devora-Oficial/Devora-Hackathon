const EmpresaModel = require("../models/EmpresaModel");

const EmpresaService = {
  listar: () => EmpresaModel.listar(),
  buscarPorId: (id) => EmpresaModel.buscarPorId(id),
  criar: (dados) => EmpresaModel.criar(dados),
  atualizar: (id, dados) => EmpresaModel.atualizar(id, dados),
  deletar: (id) => EmpresaModel.deletar(id)
};

module.exports = EmpresaService;
