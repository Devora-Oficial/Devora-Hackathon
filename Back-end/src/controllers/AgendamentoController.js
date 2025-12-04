// src/controllers/AgendamentoController.js
const AgendamentoService = require("../services/AgendamentoService");
const { ok, created, serverError } = require("../utils/sendResponse");

const STATUS_VALIDOS = ["Agendado", "Cancelado", "Concluído"];

const AgendamentoController = {
  async listarPorEmpresa(req, res, empresa_id) {
    try {
      const agendamentos = await AgendamentoService.listarPorEmpresa(empresa_id);
      ok(res, agendamentos);
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async criar(req, res, body) {
    try {
      body.status = body.status || "Agendado"; // valor padrão

      if (!STATUS_VALIDOS.includes(body.status)) {
        return res.writeHead(400).end(JSON.stringify({ error: "Status inválido" }));
      }

      const id = await AgendamentoService.criar(body);
      created(res, { id });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const affected = await AgendamentoService.atualizar(id, body);
      ok(res, { affected });
    } catch (err) {
      serverError(res, err.message);
    }
  },

  // async deletar(req, res, id) {
  //   try {
  //     const affected = await AgendamentoService.deletar(id);
  //     ok(res, { affected });
  //   } catch (err) {
  //     serverError(res, err.message);
  //     if (body.status && !STATUS_VALIDOS.includes(body.status)) {
  //       return res.writeHead(400).end(JSON.stringify({ error: "Status inválido" }));
  //     }

  //     const affected = await AgendamentoService.atualizar(id, body);
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify({ affected }));
  //   } catch (err) {
  //     res.writeHead(500);
  //     res.end(JSON.stringify({ error: err.message }));
  //   }
  // },

  async deletar(req, res, id) {
    try {
      const affected = await AgendamentoService.deletar(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ affected }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  }
};

module.exports = AgendamentoController;
