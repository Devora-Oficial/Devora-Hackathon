const AgendamentoModel = require("../models/AgendamentoModel");

const AgendamentoService = {
  listarPorEmpresa: (empresa_id) => AgendamentoModel.listarPorEmpresa(empresa_id),
  buscarPorId: (id) => AgendamentoModel.buscarPorId(id),
  criar: (dados) => AgendamentoModel.criar(dados),
  atualizar: (id, dados) => AgendamentoModel.atualizar(id, dados),
  deletar: (id) => AgendamentoModel.deletar(id)
};

module.exports = AgendamentoService;
