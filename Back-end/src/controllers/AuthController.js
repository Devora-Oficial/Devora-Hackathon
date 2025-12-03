const AuthService = require("../services/AuthService");

module.exports = {
    async login(req, res) {
        try {
            const { email, senha, tipo } = req.body;

            if (!email || !senha || !tipo) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ erro: "Dados incompletos." }));
            }

            const result = await AuthService.login(email, senha, tipo);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));

        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ erro: err.message }));
        }
    }
};
