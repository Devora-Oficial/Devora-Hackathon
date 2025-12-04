/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Funções para gerar e validar tokens JWT.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

// utils/token.js
const jwt = require("jsonwebtoken");

module.exports = {
    generate(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    },

    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
};

