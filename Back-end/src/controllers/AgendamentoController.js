// src/controllers/AgendamentoController.js
const AgendamentoService = require("../services/AgendamentoService");

const STATUS_VALIDOS = ["Agendado", "Cancelado", "Concluído"];

const AgendamentoController = {
  async listarPorEmpresa(req, res, empresa_id) {
    try {
      const agendamentos = await AgendamentoService.listarPorEmpresa(empresa_id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(agendamentos));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async criar(req, res, body) {
    try {
      body.status = body.status || "Agendado"; // valor padrão

      if (!STATUS_VALIDOS.includes(body.status)) {
        return res.writeHead(400).end(JSON.stringify({ error: "Status inválido" }));
      }

      const id = await AgendamentoService.criar(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async atualizar(req, res, id, body) {
    try {
      if (body.status && !STATUS_VALIDOS.includes(body.status)) {
        return res.writeHead(400).end(JSON.stringify({ error: "Status inválido" }));
      }

      const affected = await AgendamentoService.atualizar(id, body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ affected }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

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
