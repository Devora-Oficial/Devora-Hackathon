/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Este arquivo faz parte do conjunto de utilidades (utils)
 * utilizadas pelo backend do sistema ServiceGate.
 *
 * Objetivo:
 * - Ler o corpo (body) das requisições HTTP em Node puro.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const json = JSON.parse(body || "{}");
        resolve(json);
      } catch (err) {
        resolve({}); // Se o JSON estiver malformado, retorna vazio
      }
    });

    req.on("error", err => reject(err));
  });
};
