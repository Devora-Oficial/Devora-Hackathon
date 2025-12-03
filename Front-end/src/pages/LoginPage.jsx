// client/src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // IMPORTAR O HOOK

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth(); // USAR O HOOK REAL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Chama a função login do contexto, que faz a chamada ao backend
      await login(username, password); 
      // O redirecionamento é feito dentro da função login do contexto.

    } catch (err) {
      // Exibe a mensagem de erro do backend/requisição
      setError(err.message); 
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (o restante da sua renderização JSX) ...
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
        
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        {/* ⚠️ VERIFIQUE SE ESTE TRECHO ESTÁ COMPLETO ⚠️ */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* INPUT DE USUÁRIO */}
            <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            
            {/* INPUT DE SENHA */}
            <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            {/* BOTÃO */}
            <button 
            type="submit" 
            disabled={isSubmitting} 
            className="p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
        
        {/* ... link de cadastro ... */}
        </div>
    </div>
    );
}

export default LoginPage;