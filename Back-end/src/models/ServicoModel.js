const db = require("../database/db");

const ServicoModel = {
  async listar() {
    const [rows] = await db.query("SELECT * FROM servicos");
    return rows;
  },

  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.query("SELECT * FROM servicos WHERE empresa_id = ?", [empresa_id]);
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query("SELECT * FROM servicos WHERE id = ?", [id]);
    return rows[0];
  },

  async criar(dados) {
    const { empresa_id, nome, descricao, valor, duracao_minutos, ativo } = dados;
    const [result] = await db.query(
      "INSERT INTO servicos (empresa_id, nome, descricao, valor, duracao_minutos, ativo) VALUES (?, ?, ?, ?, ?, ?)",
      [empresa_id, nome, descricao, valor, duracao_minutos, ativo]
    );
    return result.insertId;
  },

  async atualizar(id, dados) {
    const { nome, descricao, valor, duracao_minutos, ativo } = dados;
    const [result] = await db.query(
      "UPDATE servicos SET nome = ?, descricao = ?, valor = ?, duracao_minutos = ?, ativo = ? WHERE id = ?",
      [nome, descricao, valor, duracao_minutos, ativo, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query("DELETE FROM servicos WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = ServicoModel;
