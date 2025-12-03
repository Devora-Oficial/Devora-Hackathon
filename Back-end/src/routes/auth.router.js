const AuthController = require("../controllers/AuthController");

module.exports = function(app) {
    app.post("/auth/login", AuthController.login);
};
s