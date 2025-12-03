import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex bg-[#07060a] text-white">

      {/* ---- LEFT: HERO ---- */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-700/30 backdrop-blur-xl"></div>

        <div className="relative px-16 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Crie sua conta 🚀
          </h1>

          <p className="text-gray-200 max-w-md mx-auto text-lg">
            Comece a usar o sistema e aproveite todos os recursos da plataforma.
          </p>
        </div>
      </div>

      {/* ---- RIGHT: FORM ---- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#0d0c11] p-10 rounded-2xl shadow-xl border border-white/10">

          <h2 className="text-3xl font-bold text-center mb-8">
            Criar conta
          </h2>

          <div className="space-y-5">

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium mb-1">Nome completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                placeholder="Crie uma senha"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar senha</label>
              <input
                type="password"
                placeholder="Digite novamente"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Botão */}
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 transition font-semibold rounded-lg shadow-lg shadow-purple-900/40">
              Criar conta
            </button>

            {/* Já tem conta */}
            <p className="text-center text-sm text-gray-300">
              Já possui conta?{" "}
              <Link className="text-purple-400 hover:underline" to="/login">
                Fazer login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}