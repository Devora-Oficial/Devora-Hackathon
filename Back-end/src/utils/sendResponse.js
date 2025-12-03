/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Padroniza respostas JSON no backend.
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */
module.exports = function sendResponse(res, status, data){
  res.whiteHaed(status,  { "Content-Type": "application/json" });
  res.end(JSON.stringify(data))
}