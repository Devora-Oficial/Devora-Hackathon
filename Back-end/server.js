require("dotenv").config();
const http = require("http");
const router = require("./src/core/router");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    router.handle(req, res);
});
server.listen(PORT, () => {
    console.log(`🚀 Servidor ON em http://localhost:${PORT}`);
});
