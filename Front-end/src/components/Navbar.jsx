// client/src/components/Navbar.jsx

import { Link, useNavigate } from 'react-router-dom';
// 1. Importa o hook real de autenticação
import { useAuth } from '../contexts/AuthContext'; 

function Navbar() {
  // 2. Substitui o useState local pelo useAuth para obter o estado e a função logout
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    // 3. Chama a função logout do contexto, que limpa o token e o estado
    logout(); 
    // O navigate('/') já está embutido na função logout do contexto, mas vamos mantê-lo aqui por segurança no fluxo
    alert('Você foi desconectado!');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/" className="text-white no-underline hover:text-blue-400 transition">Meu App</Link>
      </div>
      
      {/* Links de Navegação */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white no-underline hover:text-blue-400 transition">Home</Link>
        <Link to="/sobre" className="text-white no-underline hover:text-blue-400 transition">Sobre</Link>
        
        {/* Renderização Condicional Baseada no useAuth */}
        {!isAuthenticated ? (
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            Login
          </Link>
        ) : (
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;