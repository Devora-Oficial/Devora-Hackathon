const AuthService = require("../services/AuthService");
const { ok, badRequest, serverError } = require("../utils/sendResponse");

module.exports = {
    async login(req, res, body) {
        try {
            const { email, senha, tipo } = body;

            if (!email || !senha || !tipo) {
                return badRequest(res, "Dados incompletos.");
            }

            const result = await AuthService.Login(email, senha, tipo);
            ok(res, result);

        } catch (error) {
            serverError(res, error.message);
        }
    }
};
