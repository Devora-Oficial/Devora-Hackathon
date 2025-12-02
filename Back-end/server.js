const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    const resposta = {
        status: "ok",
        message: "Servidor Node puro rodando perfeitamente!",
        rota: req.url,
        metodo: req.method
    };

    res.end(JSON.stringify(resposta));
});

server.listen(3000, () => {
    console.log("🚀 Servidor ON em http://localhost:3000");
});
