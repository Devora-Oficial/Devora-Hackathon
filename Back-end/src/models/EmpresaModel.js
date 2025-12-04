/**
 * ServiceGate - Model de Empresa
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'empresas'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const db = require("../database/db");
const hashUtil = require("../utils/hash");

const EmpresaModel = {

  async listar() {
    const [rows] = await db.query(
      "SELECT id, nome, email, telefone, cep, ativo, criado_em FROM empresas ORDER BY criado_em DESC"
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query(
      "SELECT id, nome, email, telefone, cep, ativo, criado_em FROM empresas WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  async criar(dados) {
    const { nome, email, senha, telefone, endereco } = dados;

    const senhaHash = await hashUtil.hash(senha);

    const [result] = await db.query(
      `INSERT INTO empresas 
        (nome, email, senha, telefone, cep) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, email, senhaHash, telefone, endereco]
    );

    return result.insertId;
  },

  async atualizar(id, dados) {
    const { nome, email, senha, telefone, cep, ativo } = dados;

    let query = "UPDATE empresas SET nome = ?, email = ?, telefone = ?, cep = ?, ativo = ?";
    const params = [nome, email, telefone, cep, ativo !== undefined ? ativo : 1];

    if (senha) {
      const senhaHash = await hashUtil.hash(senha);
      query += ", senha = ?";
      params.push(senhaHash);
    }

    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.query(query, params);
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query(
      "DELETE FROM empresas WHERE id = ?", 
      [id]
    );
    return result.affectedRows;
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM empresas WHERE email = ? LIMIT 1",
      [email]
    );
    return rows[0] || null;
  }
};

module.exports = EmpresaModel;
