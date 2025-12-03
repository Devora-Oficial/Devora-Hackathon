const EmpresaController = require("../controllers/EmpresaController");
const parseBody = require("../utils/bodyParser");

module.exports = async function(req, res) {
  const { method, url } = req;

  // GET /empresas
  if (method === "GET" && url === "/empresas") {
    return EmpresaController.listar(req, res);
  }

  // POST /empresas
  if (method === "POST" && url === "/empresas") {
    const body = await parseBody(req);
    return EmpresaController.criar(req, res, body);
  }

  // PUT /empresas/:id
  if (method === "PUT" && url.match(/^\/empresas\/\d+$/)) {
    const id = parseInt(url.split("/")[2], 10);
    const body = await parseBody(req);
    return EmpresaController.atualizar(req, res, id, body);
  }

  // DELETE /empresas/:id
  if (method === "DELETE" && url.match(/^\/empresas\/\d+$/)) {
    const id = parseInt(url.split("/")[2], 10);
    return EmpresaController.deletar(req, res, id);
  }

  // Rota não encontrada
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Rota de empresa não encontrada" }));
};
