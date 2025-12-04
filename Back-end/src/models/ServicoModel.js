// src/models/ServicoModel.js
const db = require("../database/db");

const ServicoModel = {
  async listar() {
    const [rows] = await db.query(
      "SELECT * FROM servicos ORDER BY id DESC"
    );
    return rows;
  },

  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.query(
      "SELECT * FROM servicos WHERE empresa_id = ? ORDER BY id DESC",
      [empresa_id]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query(
      "SELECT * FROM servicos WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0] || null;
  },

  async criar(dados) {
    const { empresa_id, nome, descricao, valor, duracao_minutos, ativo } = dados;

    const [result] = await db.query(
      `INSERT INTO servicos 
      (empresa_id, nome, descricao, valor, duracao_minutos, ativo)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [empresa_id, nome, descricao, valor, duracao_minutos, ativo]
    );

    return result.insertId;
  },

  async atualizar(id, dados) {
    const { nome, descricao, valor, duracao_minutos, ativo } = dados;

    const [result] = await db.query(
      `UPDATE servicos SET 
        nome = ?, 
        descricao = ?, 
        valor = ?, 
        duracao_minutos = ?, 
        ativo = ?
      WHERE id = ?`,
      [nome, descricao, valor, duracao_minutos, ativo, id]
    );

    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM servicos WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = ServicoModel;
