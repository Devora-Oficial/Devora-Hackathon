/**
 * ServiceGate - Model de Serviço
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'servicos'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

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
    const fieldsToUpdate = {};
    const allowedFields = ['nome', 'descricao', 'valor', 'duracao_minutos', 'ativo'];

    // CORREÇÃO: Cria um objeto apenas com os campos que vieram no 'dados'
    for (const key of allowedFields) {
        if (dados[key] !== undefined) {
            fieldsToUpdate[key] = dados[key];
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        return 0; // Nada para atualizar se o objeto estiver vazio
    }

    // Cria a query dinamicamente e os valores para o prepared statement
    const setClauses = Object.keys(fieldsToUpdate).map(field => `${field} = ?`);
    const values = Object.values(fieldsToUpdate);

    const query = `UPDATE servicos SET ${setClauses.join(', ')} WHERE id = ?`;
    const [result] = await db.query(query, [...values, id]);

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