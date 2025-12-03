import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-[#07060a] text-white">

      {/* ---- LEFT: FORM ---- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#0d0c11] p-10 rounded-2xl shadow-xl border border-white/10">

          <h2 className="text-3xl font-bold text-center mb-8">
            Entrar na plataforma
          </h2>

          <div className="space-y-5">

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
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Botão */}
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 transition font-semibold rounded-lg shadow-lg shadow-purple-900/40">
              Entrar
            </button>

            {/* Criar conta */}
            <p className="text-center text-sm text-gray-300">
              Não tem conta?{" "}
              <Link className="text-purple-400 hover:underline" to="/register">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ---- RIGHT: HERO ---- */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-700/30 backdrop-blur-xl"></div>

        <div className="relative px-16 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Bem-vindo de volta 👋
          </h1>

          <p className="text-gray-200 max-w-md mx-auto text-lg">
            Continue acessando o sistema de forma segura e rápida.  
            Sua produtividade começa aqui.
          </p>
        </div>

      </div>
    </div>
  );
}