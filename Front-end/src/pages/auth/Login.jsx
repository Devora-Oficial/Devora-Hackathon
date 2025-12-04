import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciais inválidas ou erro no servidor.");
      }

      const data = await response.json();

      // Armazena o token
      localStorage.setItem("authToken", data.token);
      
      // Armazena a role
      localStorage.setItem("role", data.role);

      // Armazena os dados do usuário
      localStorage.setItem("userData", JSON.stringify({
        nome: data.nome || data.user?.nome || "Usuário",
        email: data.email || data.user?.email || email,
        empresa: data.empresa || data.user?.empresa || "",
        id: data.id || data.user?.id || null
      }));

      // Redireciona com base na role
      if (data.role === "empresa") {
        navigate("/dashboardEmpresa");
      } else if (data.role === "admin") {
        navigate("/dashboardAdmin");
      } else {
        setError("Tipo de conta não reconhecido.");
      }

    } catch (err) {
      setError(err.message);
      console.error("Erro de Login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#07060a] text-white">

      {/* Div da parte esquerda da página (Formulário) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Link 
          to="/"
          className="absolute top-8 left-8 flex items-center space-x-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5" /> 
          <span className="hidden sm:inline">Voltar para Home</span>
        </Link>
        
        <div className="w-full max-w-md bg-[#0d0c11] p-10 rounded-2xl shadow-xl border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-8">Entrar na plataforma</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5"> 

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
              <input 
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/30 p-2 rounded-lg">
                    {error}
                </div>
            )}

            <button 
              type="submit" 
              className={`w-full py-2 font-semibold rounded-lg shadow-lg shadow-purple-900/40 transition cursor-pointer 
                          ${isLoading 
                            ? 'bg-purple-800 opacity-70 cursor-not-allowed' 
                            : 'bg-purple-600 hover:bg-purple-500'}`} 
              disabled={isLoading} 
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>

          </form>
          
        </div>
      </div>

      {/* Div da parte direita da página */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 to-indigo-700/30 backdrop-blur-xl"></div>

        <div className="relative px-16 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Bem-vindo ao ServiceGate</h1>
          <p className="text-gray-200 max-w-md mx-auto text-lg">
            Continue acessando o sistema de forma segura e rápida.  
            Sua produtividade começa aqui.
          </p>
        </div>

      </div>
    </div>
  );
}