const EmpresaService = require("../services/EmpresaService");

const EmpresaController = {
  async listar(req, res) {
    try {
      const empresas = await EmpresaService.listar();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(empresas));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async criar(req, res, body) {
    try {
      const id = await EmpresaService.criar(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async atualizar(req, res, id, body) {
    try {
      const rows = await EmpresaService.atualizar(id, body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ updated: rows }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  },

  async deletar(req, res, id) {
    try {
      const rows = await EmpresaService.deletar(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ deleted: rows }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  }
};

module.exports = EmpresaController;
