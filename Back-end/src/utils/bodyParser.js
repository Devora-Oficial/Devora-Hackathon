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

module.exports = function bodyParser(req){
  return Promise ((resolve, reject)=>{
    try {
      let body = "";
      
      req.on("data", chunk => {
        body += chunk.toString();
      });
      
      req.on("end", () => {
        try {
            const json = JSON.parse(body || "{}");
            resolve(json);
        } catch (err) {
            resolve({}); // evita quebrar o servidor
        }
      });

      req.on("error", err => reject(err));

    } catch (err){
      reject(err)
    }
  });
}
