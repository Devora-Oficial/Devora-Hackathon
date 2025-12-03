import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#07060a]/40 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="text-white font-bold">SG</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Service<span className="text-indigo-400">Gate</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition">Recursos</a>
          <a href="#panels" className="hover:text-white transition">Painéis</a>
          <a href="#pricing" className="hover:text-white transition">Preços</a>
          <a href="#integrations" className="hover:text-white transition">Integrações</a>

          <Link
            to="/login"
            className="px-4 py-2 rounded-full border border-white/10 hover:border-purple-500 text-white transition"
          >
            Entrar
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition font-medium shadow-lg shadow-purple-900/40"
          >
            Criar Conta
          </Link>
        </nav>

        {/* mobile placeholder */}
        <div className="md:hidden">
          <Link to="/register" className="px-3 py-2 rounded bg-purple-600 text-white text-sm">Criar</Link>
        </div>
      </div>
    </header>
  );
}
