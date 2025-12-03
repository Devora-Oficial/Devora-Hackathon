// server/authController.js

const jwt = require('jsonwebtoken');

// Chave Secreta para assinar o JWT (Mude isso para uma string longa e aleatória!)
const SECRET_KEY = 'sua_chave_muito_secreta_e_forte'; 

// Simulação de "Banco de Dados"
const users = [
    { id: 1, username: 'admin', password: 'password', role: 'platform_admin', name: 'Admin Master' },
    { id: 2, username: 'company', password: 'password', role: 'company_user', name: 'Empresa Teste', companyName: 'ServiceGate' },
];

function loginHandler(req, res, username, password) {
    // 1. Encontrar o usuário
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: 'Credenciais inválidas.' }));
    }

    // 2. Gerar o JWT (Token)
    const token = jwt.sign(
        { id: user.id, role: user.role, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expira em 1 hora
    );

    // 3. Responder com o token
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
        token: token,
        user: { id: user.id, username: user.username, role: user.role, name: user.name, companyName: user.companyName }
    }));
}

module.exports = {
    loginHandler,
    SECRET_KEY 
};