import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-[#07060a] text-white">

      {/* Div da parte esquerda da página */}
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
          <div className="space-y-5">

            {/* placeholder do email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email"placeholder="seuemail@exemplo.com"className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"/>
            </div>

            {/* placeholder da senha */}
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input type="password"placeholder="••••••••"className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"/>
            </div>

            {/* botao de entrar (tirar o Link quando for fazer Login funcional) */}
            <Link to="/dashboardEmpresa">
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 transition font-semibold rounded-lg shadow-lg shadow-purple-900/40">
                  Entrar
              </button>
            </Link>

          </div>
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