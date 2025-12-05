const AuthController = require("../controllers/AuthController");
const parseBody = require("../utils/bodyParser"); // IMPORTANTE

module.exports = async function (req, res) {
    const { method, url } = req;

    if (method === "POST" && url === "/auth/login") {
        const body = await parseBody(req); // lê o JSON do body
        return AuthController.login(req, res, body); // envia o body para o controller
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota de auth não encontrada" }));
};
