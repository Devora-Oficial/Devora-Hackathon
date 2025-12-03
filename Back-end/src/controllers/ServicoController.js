const ServicoService = require("../services/ServicoService");

const ServicoController = {
  async listar(req, res) {
    try {
      const servicos = await ServicoService.listar();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(servicos));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async criar(req, res, body) {
    try {
      const id = await ServicoService.criar(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const affectedRows = await ServicoService.atualizar(id, body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ updated: affectedRows }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async deletar(req, res, id) {
    try {
      const affectedRows = await ServicoService.deletar(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ deleted: affectedRows }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  }
};

module.exports = ServicoController;
