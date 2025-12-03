const db = require("../database/db");

module.exports = {
    listar() {
        return db.query("SELECT * FROM produtos");
    },

    criar(produto) {
        return db.query("INSERT INTO produtos SET ?", produto);
    }
};
