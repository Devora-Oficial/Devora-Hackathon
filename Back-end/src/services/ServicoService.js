const ServicoModel = require("../models/ServicoModel");

const ServicoService = {
  listar: () => ServicoModel.listar(),
  listarPorEmpresa: (empresa_id) => ServicoModel.listarPorEmpresa(empresa_id),
  buscarPorId: (id) => ServicoModel.buscarPorId(id),
  criar: (dados) => ServicoModel.criar(dados),
  atualizar: (id, dados) => ServicoModel.atualizar(id, dados),
  deletar: (id) => ServicoModel.deletar(id)
};

module.exports = ServicoService;
