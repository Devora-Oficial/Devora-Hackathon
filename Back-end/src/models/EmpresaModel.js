const db = require("../database/db");
const bcrypt = require("bcrypt");

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
    return rows[0];
  },

  async criar(dados) {
    const { nome, email, senha, telefone, cep } = dados;

    if (!telefone || !cep) {
      throw new Error("Telefone e CEP são obrigatórios.");
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      "INSERT INTO empresas (nome, email, senha, telefone, cep) VALUES (?, ?, ?, ?, ?)",
      [nome, email, hashSenha, telefone, cep]
    );

    return result.insertId;
  },

  async atualizar(id, dados) {
    const { nome, email, senha, telefone, cep, ativo } = dados;

    let query = "UPDATE empresas SET nome = ?, email = ?, telefone = ?, cep = ?, ativo = ?";
    const params = [nome, email, telefone, cep, ativo !== undefined ? ativo : 1];

    if (senha) {
      const hashSenha = await bcrypt.hash(senha, 10);
      query += ", senha = ?";
      params.push(hashSenha);
    }

    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.query(query, params);
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await db.query("DELETE FROM empresas WHERE id = ?", [id]);
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
