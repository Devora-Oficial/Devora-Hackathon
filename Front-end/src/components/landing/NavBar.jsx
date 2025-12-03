import React from "react";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#07060a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Service<span className="text-indigo-400">Gate</span>
          </span>
        </div>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300 text-sm">
          <a href="#features" className="hover:text-white transition">Recursos</a>
          <a href="#pricing" className="hover:text-white transition">Preços</a>
          <a href="#contact" className="hover:text-white transition">Contato</a>

          <a
            href="#login"
            className="px-4 py-2 rounded-full border border-white/10 hover:border-white/20 text-white transition"
          >
            Entrar
          </a>

          <a
            href="#signup"
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-900/40"
          >
            Criar conta
          </a>
        </nav>

      </div>
    </header>
  );
}