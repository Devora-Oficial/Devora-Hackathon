// utils/authMiddleware.js
const { verify } = require("./token");

module.exports = function authMiddleware(req, res) {
    const authHeader = req.headers["authorization"];

    // 1. Check for missing header
    if (!authHeader) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Token não enviado" }));
        return null;
    }

    // Split the header: Expected format is "Bearer <token>"
    const parts = authHeader.split(' ');

    // 2. Check for correct format (must have 2 parts, and the first part must be 'Bearer')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Formato do Token inválido. Use: Bearer <token>" }));
        return null;
    }

    const token = parts[1];
    
    // 3. Check for empty token string (e.g., if client sends "Bearer ")
    if (!token) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Token não fornecido após 'Bearer'" }));
        return null;
    }

    try {
        const decoded = verify(token); // The verify() function should handle 'jwt malformed' or other errors by throwing
        
        // Final check if verification was unsuccessful
        if (!decoded) {
            // This is a redundant check if verify throws on failure, but keeps the flow clean
            throw new Error("Token verification failed"); 
        }

        // disponibiliza o usuário na request
        req.user = decoded;
        return decoded;
        
    } catch (e) {
        // This catches the 'jwt malformed' error from the line 'const decoded = verify(token);'
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Token inválido ou expirado" }));
        return null;
    }
};