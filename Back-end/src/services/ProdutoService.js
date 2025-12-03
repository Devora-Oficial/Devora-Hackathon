const ProdutoModel = require("../models/ProdutoModel");

module.exports = {
    listar() {
        return ProdutoModel.listar();
    },

    criar(data) {
        return ProdutoModel.criar(data);
    }
};
