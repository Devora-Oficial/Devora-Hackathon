import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciais inválidas.");
      }

      const data = await response.json();

      // Armazena o token
      localStorage.setItem("token", data.token);
      
      // Armazena a role
      localStorage.setItem("role", data.role);
      localStorage.setItem("userData", JSON.stringify({
        nome: data.nome || "Usuário",
        email: data.email || email,
        id: data.id || null
      }));

      if (data.role === "empresa") navigate("/dashboardEmpresa");
      if (data.role === "admin") navigate("/dashboardAdmin");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex text-white relative overflow-hidden"
    >

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-[#000000]">

        <Link 
          to="/"
          className="absolute top-8 left-8 flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-black/30 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Voltar para Home</span>
        </Link>

        <div className="w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 shadow-2xl">
          <div className="bg-[#0d0c11]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10">

            <h2 className="text-3xl font-bold text-center mb-8">Entrar na plataforma</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input 
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* SENHA */}
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="text-red-300 text-sm text-center bg-red-900/30 p-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* BOTÃO */}
              <button
                type="submit"
                className="w-full py-2 font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </button>

            </form>

          </div>
        </div>
      </div>



      {/* LADO DIREITO COM ANIMAÇÃO */}
      <motion.div 
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden bg-[#07060a]"
      >

        {/* fundo animado */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "linear-gradient(135deg, #3b1e63, #4b2b85)",
              "linear-gradient(135deg, #4b2b85, #243060)",
              "linear-gradient(135deg, #243060, #3b1e63)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* glow animando */}
        <motion.div
          className="absolute blur-[180px] w-[700px] h-[700px] bg-purple-700/30 rounded-full"
          animate={{ x: [0, 70, -70, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-center relative"
        >
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Bem-vindo ao <span className="text-purple-400">ServiceGate</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-md mx-auto">
            Segurança, velocidade e tecnologia moderna ao seu alcance.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
