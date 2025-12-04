/**
 * ServiceGate - Empresa Model
 * -------------------------------------------------
 * Responsável por operações de acesso e manipulação de dados 
 * na tabela 'empresas' do banco de dados (CRUD).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */

const EmpresaModel = require("../models/EmpresaModel");
const { hash } = require("../utils/hash"); 

const EmpresaService = {
  async listar() {
    return await EmpresaModel.listar();
  },

  async buscarPorId(id) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    return await EmpresaModel.buscarPorId(id);
  },

  async criar(dados) {
    if (!dados?.nome || !dados?.email || !dados?.senha || !dados?.telefone || !dados?.cep) {
      throw new Error("Dados incompletos para criar a empresa.");
    }
    
    const { nome, email, senha, telefone, cep } = dados;

    // Hashear a senha antes de salvar!
    const senhaHash = await hash(senha); 
    
    const dadosParaModel = {
        nome, 
        email, 
        senha: senhaHash, 
        telefone, 
        cep
    };
    
    return await EmpresaModel.criar(dadosParaModel);
  },

  async atualizar(id, dados) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    
    // Hashear a senha se ela estiver sendo atualizada
    if (dados.senha) {
        dados.senha = await hash(dados.senha);
    }
    
    return await EmpresaModel.atualizar(id, dados);
  },

  async deletar(id) {
    if (!id) throw new Error("ID da empresa é obrigatório.");
    return await EmpresaModel.deletar(id);
  }
};

module.exports = EmpresaService;