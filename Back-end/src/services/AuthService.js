/**
 * ServiceGate - Auth Service
 * Responsável: Guilherme Nantes
 * Lógica: Tenta autenticar primeiro como Admin, depois como Empresa.
 */

const AdminModel = require("../models/AdminModel");
const EmpresaModel = require("../models/EmpresaModel");
// Assumindo que você tem essas utilidades:
const { compare } = require("../utils/hash");
const { generate } = require("../utils/token");

module.exports = {
    // ⚠️ Nova função de autenticação que não exige o 'tipo'
    async authenticateUser(email, senha) {
        let user = null;
        let userRole = null;
        
        // --- Tenta como Admin ---
        try {
            const admin = await AdminModel.findByEmail(email);
            if (admin) {
                const valid = await compare(senha, admin.senha);
                if (valid) {
                    user = admin;
                    userRole = 'admin';
                }
            }
        } catch (error) {
            // Ignora erros de DB na primeira tentativa e tenta o próximo modelo
            console.warn("Falha ao buscar Admin. Tentando Empresa.", error.message);
        }

        // --- Tenta como Empresa (se não encontrou Admin) ---
        if (!user) {
            try {
                const empresa = await EmpresaModel.findByEmail(email);
                if (empresa) {
                    const valid = await compare(senha, empresa.senha);
                    if (valid) {
                        user = empresa;
                        userRole = 'empresa';
                    }
                }
            } catch (error) {
                console.warn("Falha ao buscar Empresa.", error.message);
            }
        }

        // --- Resultado Final ---
        if (!user || !userRole) {
            // Lança erro que será capturado pelo Controller (Status 401)
            throw new Error("Credenciais Inválidas ou usuário não encontrado.");
        }

        // Gera o token com a role (tipo) descoberta
        const token = generate({
            id: user.id,
            email: user.email,
            role: userRole
        });

        return {
            id: user.id,
            nome: user.nome || 'Usuário', // Garante que o nome exista
            email: user.email,
            role: userRole,
            token
        };
    }
};