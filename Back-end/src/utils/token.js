/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Funções para gerar e validar tokens JWT.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

const jwt = require("jsonwebtoken");

module.exports = {
    generate(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    },

    verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null; // evita quebrar o servidor
        }
    }
};
