const db = require("./src/database/db");

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("Conexão OK! Resultado:", rows);
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
}

testConnection();