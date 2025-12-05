/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Funções auxiliares para hash de senha (bcrypt).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */
const bcrypt = require("bcrypt");

module.exports = {

  async hash(str) {
    return await bcrypt.hash(str, 10);
  },
  
  async compare(str, hash) {
    return await bcrypt.compare(str, hash);
  }

}