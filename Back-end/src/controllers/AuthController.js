/**
 * ServiceGate - Controllers de Auth
 * -------------------------------------------------
 * Responsável por Auth membros.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Robert Fernade (Desenvolvimento Backend)
 */

const AuthService = require("../services/AuthService");
// Importação correta do utilitário de resposta
const { ok, badRequest, serverError, unauthorized } = require("../utils/sendResponse");

// Adicionando a função 'unauthorized' no sendResponse.js para 401
// Você pode adicionar: function unauthorized(res, message) { send(res, 401, { error: message }); }

module.exports = {
    async login(req, res, body) { // Recebe o body que vem do AuthRoutes.js

        const { email, senha, tipo } = body; // Desestrutura tudo que precisa

        try {
            // 1. Validação de campos obrigatórios (Usando badRequest 400)
            if (!email || !senha || !tipo) {
                return badRequest(res, "Email, senha e tipo (admin/empresa) são obrigatórios.");
            }
            
            // 2. Chama a lógica de autenticação no Service
            const result = await AuthService.login(email, senha, tipo);

            // 3. Resposta de Sucesso (200 OK)
            return ok(res, result);

        } catch (error) {
            // 4. Tratamento de Erro Específico (401 Unauthorized)
            // Se a mensagem de erro indicar que a credencial é inválida/não existe, 
            // responde 401. Caso contrário, responde 500.
            if (error.message.includes("Inválidas") || error.message.includes("encontrado") || error.message.includes("inválido")) {
                // Usando unauthorized (401) do utilitário
                return unauthorized(res, "Credenciais Inválidas ou tipo de usuário incorreto.");
            }    
            // 5. Resposta de Erro Geral (500 Server Error)
            serverError(res, error.message);
        }
    }
};
