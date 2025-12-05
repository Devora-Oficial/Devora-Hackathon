/**
 * ServiceGate - Auth de Serviço (Autenticação)
 * -------------------------------------------------
 * Responsável por operações de validação de credenciais 
 * (Admin e Empresa) e geração de token de acesso (JWT).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernados (Desenvolvimento Backend)
 */


const AdminModel = require("../models/AdminModel");
const EmpresaModel = require("../models/EmpresaModel");
// Assumindo que você tem essas utilidades:
const { compare } = require("../utils/hash");
const { generate } = require("../utils/token");

const AuthService = {
    // 1. Método com TIPO de login explícito (Mais performático)
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
            // Mensagem genérica para segurança
            throw new Error("Credenciais Inválidas."); 
        }

        const senhaValida = await compare(senha, user.senha);

        if (!senhaValida) {
            throw new Error("Credenciais Inválidas."); 
        }

        const token = generate({
            id: user.id,
            email: user.email,
            role: tipo
        });

        return {
            id: user.id,
            nome: user.nome || (tipo === 'admin' ? 'Administrador' : 'Empresa'),
            email: user.email,
            role: tipo,
            token
        };
    },

    // 2. Método sem TIPO explícito (Mais conveniente, corrigido para ser seguro)
    async authenticateUser(email, senha) {
        if (!email || !senha) {
            throw new Error("Dados insuficientes para autenticação.");
        }

        let user = null;
        let userRole = null;
        
        // Tenta buscar em Admin (Se houver erro de DB, ele é lançado aqui)
        const admin = await AdminModel.findByEmail(email);
        
        if (admin) {
            user = admin;
            userRole = 'admin';
        }

        // Se não encontrou em Admin, tenta buscar em Empresa
        if (!user) {
            const empresa = await EmpresaModel.findByEmail(email);
            if (empresa) {
                user = empresa;
                userRole = 'empresa';
            }
        }

        // --- Validação de Credenciais ---
        if (!user || !userRole) {
            throw new Error("Credenciais Inválidas."); 
        }

        // Compara a senha (Segurança!)
        const senhaValida = await compare(senha, user.senha);
        
        if (!senhaValida) {
            throw new Error("Credenciais Inválidas."); 
        }

        // Gera o token com a role (tipo) descoberta
        const token = generate({
            id: user.id,
            email: user.email,
            role: userRole
        });

        return {
            id: user.id,
            nome: user.nome || 'Usuário',
            email: user.email,
            role: userRole,
            token
        };
    }
};

module.exports = AuthService;
