/**
 * ServiceGate - Auth Service
 * Responsável: Guilherme Nantes
 */

const AdminModel = require("../models/AdminModel");
const EmpresaModel = require("../models/EmpresaModel");
const { compare } = require("../utils/hash");
const { generate } = require("../utils/token");

module.exports = {
  async Login(email,senha,tipo){
    let user = null
    if (tipo === "admin") {
        user = await AdminModel.findByEmail(email);
    } else if (tipo === "empresa") {
        user = await EmpresaModel.findByEmail(email);
    } else {
        throw new Error("Tipo de login inválido.");
    }

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    
    const valid = await compare(senha, user.senha);
    if (!valid) {
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
}