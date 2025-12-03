import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#07060a]/40 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="text-white font-bold">SG</span>
          </div>

          <span className="text-white font-semibold text-lg tracking-tight">
            Service<span className="text-indigo-400">Gate</span>
          </span>

          <nav className="flex items-center gap-2 text-white font-semibold text-sm">

            <NavLink
              to="/dashboardAdmin"
              className={({ isActive }) =>
                `px-3 py-2 ${isActive ? "border-b-2 border-blue-900" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/empresas"
              className={({ isActive }) =>
                `px-3 py-2 ${isActive ? "border-b-2 border-blue-900" : ""}`
              }
            >
              Empresas
            </NavLink>

            <NavLink
              to="/relatorios"
              className={({ isActive }) =>
                `px-3 py-2 ${isActive ? "border-b-2 border-blue-900" : ""}`
              }
            >
              Relatórios
            </NavLink>

            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                `px-3 py-2 ${isActive ? "border-b-2 border-blue-900" : ""}`
              }
            >
              Usuários
            </NavLink>

          </nav>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300"></nav>

        <div className="md:hidden">
          <NavLink
            to="/register"
            className="px-3 py-2 rounded bg-purple-600 text-white text-sm"
          >
            Criar
          </NavLink>
        </div>

      </div>
    </header>
  );
}
