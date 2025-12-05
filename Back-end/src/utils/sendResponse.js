/**
 * ServiceGate - Utilitário Interno
 * -------------------------------------------------
 * Padroniza respostas JSON no backend.
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

module.exports = {
  send,
  ok,
  created,
  badRequest,
  serverError
};
