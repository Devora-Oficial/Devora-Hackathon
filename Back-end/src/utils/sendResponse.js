/**
 * ServiceGate - Utilitário Interno (sendResponse)
 * -------------------------------------------------
 * Padroniza respostas JSON no backend (status codes HTTP).
 *
 * Responsável:
 * - Guilherme Nantes (Desenvolvimento Backend)
 */

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function ok(res, data) {
  send(res, 200, data);
}

function created(res, data) {
  send(res, 201, data);
}

function badRequest(res, message) {
  send(res, 400, { error: message });
}

function serverError(res, message) {
  send(res, 500, { error: message });
}

// 💡 Sugestão: Adicionar Not Found e Forbidden
function notFound(res, message = "Recurso não encontrado.") {
    send(res, 404, { error: message });
}

function forbidden(res, message = "Acesso negado.") {
    send(res, 403, { error: message });
}

module.exports = {
  send,
  ok,
  created,
  badRequest,
  serverError,
  notFound, 
  forbidden
};