/**
 * db.js
 * -----------------------------------------------------------------------------
 * Responsável pela configuração e gerenciamento da conexão com o banco MySQL.
 * Utiliza mysql2/promise para suporte assíncrono e Connection Pool, garantindo
 * melhor desempenho e estabilidade em cenários de alta carga.
 *
 * Ajustes recomendados:
 *  - Utilize variáveis de ambiente (.env) em ambientes de produção.
 *  - Monitore possíveis erros de conexão e quedas de rede.
 *  - Evite inserir lógica de negócio neste arquivo — apenas infraestrutura.
 *
 * Responsáveis pelo arquivo:
 *  - Guilherme Nantes (criação)
 *  - Eliel Murbahr (QA)
 *  - Robert Fernandes (criação)
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
