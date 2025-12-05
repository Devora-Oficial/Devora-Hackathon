/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Logger simples para monitoramento de fluxo,
 * erros e etapas de execução no backend.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

module.exports = {
    info(msg) {
        console.log("[INFO]", new Date().toISOString(), "-", msg);
    },

    error(msg) {
        console.error("[ERROR]", new Date().toISOString(), "-", msg);
    }
};
