/**
 * ServiceGate - Auth Service
 * Responsável: Guilherme Nantes
 */

const AdminModel = require("../models/AdminModel");
const EmpresaModel = require("../models/EmpresaModel");
const { compare } = require("../utils/hash");
const { generate } = require("../utils/token");

const AuthService = {
  async login(email, senha, tipo) {
    if (!email || !senha || !tipo) {
      throw new Error("Dados insuficientes para login.");
    }

    let user = null;

    switch (tipo) {
      case "admin":
        user = await AdminModel.findByEmail(email);
        break;

      case "empresa":
        user = await EmpresaModel.findByEmail(email);
        break;

      default:
        throw new Error("Tipo de login inválido.");
    }

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const senhaValida = await compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("Senha incorreta.");
    }

    const token = generate({
      id: user.id,
      email: user.email,
      role: tipo
    });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: tipo,
      token
    };
  }
};

module.exports = AuthService;
