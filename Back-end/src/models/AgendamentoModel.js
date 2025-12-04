/**
 * ServiceGate - Model de Agendamentos
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'agendamentos'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const db = require("../database/db");

const AgendamentoModel = {

  async listarPorEmpresa(empresa_id) {
    const [rows] = await db.query(
      `SELECT 
         id, servico_id, empresa_id, data_hora, duracao_minutos, 
         status, observacao, criado_em
       FROM agendamentos
       WHERE empresa_id = ?
       ORDER BY data_hora ASC`,
      [empresa_id]
    );

    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query(
      `SELECT 
         id, servico_id, empresa_id, data_hora, duracao_minutos, 
         status, observacao, criado_em
       FROM agendamentos
       WHERE id = ?`,
      [id]
    );

    return rows[0] || null;
  },

  async criar(dados) {
    const {
      servico_id,
      empresa_id,
      data_hora,
      duracao_minutos,
      status,
      observacao
    } = dados;

    const [result] = await db.query(
      `INSERT INTO agendamentos 
        (servico_id, empresa_id, data_hora, duracao_minutos, status, observacao)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        servico_id,
        empresa_id,
        data_hora,
        duracao_minutos,
        status || "pendente",
        observacao || null
      ]
    );

    return result.insertId;
  },

  async atualizar(id, dados) {
    const { data_hora, duracao_minutos, status, observacao } = dados;

    const [result] = await db.query(
      `UPDATE agendamentos
       SET data_hora = ?, 
           duracao_minutos = ?, 
           status = ?, 
           observacao = ?
       WHERE id = ?`,
      [data_hora, duracao_minutos, status, observacao, id]
    );

    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM agendamentos WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = AgendamentoModel;
