const AuthService = require("../services/AuthService");

module.exports = {
    async login(req, res, body) {
        try {
            const { email, senha, tipo } = body;

            if (!email || !senha || !tipo) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Dados incompletos." }));
            }

            const result = await AuthService.Login(email, senha, tipo);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
};
