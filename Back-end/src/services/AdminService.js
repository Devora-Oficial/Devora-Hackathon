/**
 * ServiceGate - Admin Model
 * -------------------------------------------------
 * Responsável por operações de acesso e manipulação de dados 
 * na tabela 'admins' do banco de dados (CRUD), garantindo a 
 * exclusão da senha em listagens (exceto na busca para login).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */

const AdminModel = require("../models/AdminModel");
const { hash } = require("../utils/hash"); // Supõe-se que 'hash' usa bcrypt

const AdminService = {
  listar: () => AdminModel.listar(),

  // Simplificado, assumindo que vai ser implementado ou removido
  buscarPorId: (id) => AdminModel.buscarPorId(id), 

  criar: async (dados) => {
    const { nome, email, senha } = dados;
    if (!nome || !email || !senha) {
      // Erro de negócio (dados ruins)
      throw new Error("Dados incompletos."); 
    }
    
    // 1. Hashear a senha para segurança máxima
    const senhaHash = await hash(senha);
    
    // 2. Enviar a senha hasheada para o Model salvar no banco
    return AdminModel.criar({ nome, email, senha: senhaHash });
  },

  atualizar: async (id, dados) => {
    const { nome, email, senha } = dados;
    const updateData = { nome, email };
    
    if (senha) {
      // Hashea a nova senha, se ela for enviada
      updateData.senha = await hash(senha);
    }
    
    if (AdminModel.atualizar) {
      return AdminModel.atualizar(id, updateData);
    }
    // Retorna um erro se a função não estiver pronta no Model
    throw new Error("Função atualizar não implementada no AdminModel.");
  },

  deletar: async (id) => {
    if (AdminModel.deletar) {
      return AdminModel.deletar(id);
    }
    throw new Error("Função deletar não implementada no AdminModel.");
  }
};

module.exports = AdminService;