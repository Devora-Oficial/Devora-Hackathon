const AuthService = require("../services/AuthService");

module.exports = {
    // A função agora recebe apenas (req, res) e é assíncrona
    async login(req, res) {
        
        // 1. CORREÇÃO: Pega apenas email e password do req.body. Renomeia 'password' para 'senha'.
        const { email, password: senha } = req.body;

        try {
            // 2. CORREÇÃO: Validação agora exige apenas email e senha.
            if (!email || !senha) {
                res.writeHead(400, { "Content-Type": "application/json" });
                // Garante que a resposta de erro seja enviada
                return res.end(JSON.stringify({ message: "Email e senha são obrigatórios." }));
            }

            // 3. CORREÇÃO: Chama a função CORRETA do serviço (authenticateUser)
            const result = await AuthService.authenticateUser(email, senha);

            // 4. Resposta de sucesso (200 OK)
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(result));
            
        } catch (error) {
            // 5. Resposta de erro (401 Unauthorized ou 400 Bad Request)
            const statusCode = (error.message.includes("Inválidas") || error.message.includes("encontrado")) ? 401 : 400;
            
            res.writeHead(statusCode, { "Content-Type": "application/json" });
            // Garante que a resposta de erro seja enviada
            return res.end(JSON.stringify({ message: error.message }));
        }
    }
};
