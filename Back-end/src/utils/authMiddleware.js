// utils/authMiddleware.js (Versão Corrigida para Retorno Consistente)

const { verify } = require("./token");

module.exports = function authMiddleware(req) { // Removido 'res'
    // Usa 'authorization' em minúsculo, pois o Node normaliza os headers
    const authHeader = req.headers["authorization"]; 

    // 1. Check for missing header
    if (!authHeader) {
        // Retorna o objeto de erro esperado pelo router
        return { error: true, message: "Token não enviado" }; 
    }

    // Split the header: Expected format is "Bearer <token>"
    const parts = authHeader.split(' ');

    // 2. Check for correct format (must have 2 parts, and the first part must be 'Bearer')
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return { error: true, message: "Formato do Token inválido. Use: Bearer <token>" };
    }

    const token = parts[1];
    
    // 3. Check for empty token string
    if (!token) {
        return { error: true, message: "Token não fornecido após 'Bearer'" };
    }

    try {
        const userPayload = verify(token); 
        
        // Garante que o payload retorne no formato user
        req.user = userPayload; 
        
        // Retorna o payload decodificado (que contém id, email, role, etc)
        return { user: userPayload, error: false }; 
        
    } catch (e) {
        // Captura erros de Token inválido ou expirado
        return { error: true, message: "Token inválido ou expirado" };
    }
};
