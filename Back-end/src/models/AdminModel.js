/**
 * ServiceGate - Model de Administradores da Plataforma
 * -------------------------------------------------
 * Responsável por operações no banco relacionadas à tabela 'plataforma_admins'.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const db = require("../database/db");
const hashUtil = require("../utils/hash");

const AdminModel = {

  async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT id, nome, email, senha, criado_em
       FROM plataforma_admins
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    return rows[0] || null;
  },

  async criar(dados) {
    const { nome, email, senha } = dados;

    const hashSenha = await hashUtil.hash(senha);

    const [result] = await db.query(
      `INSERT INTO plataforma_admins (nome, email, senha)
       VALUES (?, ?, ?)`,
      [nome, email, hashSenha]
    );

    return result.insertId;
  },

  async listar() {
    const [rows] = await db.query(
      `SELECT id, nome, email, criado_em
       FROM plataforma_admins
       ORDER BY criado_em DESC`
    );

    return rows;
  }
};

module.exports = AdminModel;

