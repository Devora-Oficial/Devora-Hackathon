const db = require("../database/db");
const bcrypt = require("bcrypt");

const EmpresaModel = {
  async listar() {
    const [rows] = await db.query(
      "SELECT id, nome, email, telefone, endereco, criado_em FROM empresas ORDER BY criado_em DESC"
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query(
      "SELECT id, nome, email, telefone, endereco, criado_em FROM empresas WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async criar(dados) {
    const { nome, email, senha, telefone, endereco } = dados;

    // Hash da senha
    const hashSenha = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      "INSERT INTO empresas (nome, email, senha, telefone, endereco) VALUES (?, ?, ?, ?, ?)",
      [nome, email, hashSenha, telefone, endereco]
    );

    return result.insertId;
  },

  async atualizar(id, dados) {
    const { nome, email, senha, telefone, endereco } = dados;

    // Monta query dinamicamente para atualizar senha apenas se fornecida
    let query = "UPDATE empresas SET nome = ?, email = ?, telefone = ?, endereco = ?";
    const params = [nome, email, telefone, endereco];

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
  }
};

module.exports = EmpresaModel;
