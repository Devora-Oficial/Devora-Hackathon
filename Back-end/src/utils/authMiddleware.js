// utils/authMiddleware.js
const { verify } = require("./token");

module.exports = function authMiddleware(req, res) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Token não enviado" }));
        return null; // para a execução da rota
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = verify(token);

    if (!decoded) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: true, message: "Token inválido ou expirado" }));
        return null; // para a execução da rota
    }

    // disponibiliza o usuário na request
    req.user = decoded;
    return decoded; // retorna os dados do usuário para uso na rota
};
