import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Scissors, Calendar, Settings, Moon, Sun, LogOut } from "lucide-react";

export default function NavbarManage({ userType = "company", userName = "João Silva", companyName = "Barbearia Premium" }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Define navegação baseada no tipo de usuário
  const navItems = userType === "admin" 
    ? [
        { name: "Dashboard", path: "/dashboardAdmin", icon: LayoutDashboard },
        { name: "Empresas", path: "/empresas", icon: Building2 },
        { name: "Configurações", path: "/configuracoesAdmin", icon: Settings },
      ]
    : [
        { name: "Dashboard", path: "/dashboardEmpresa", icon: LayoutDashboard },
        { name: "Clientes", path: "/clientes", icon: Users },
        { name: "Serviços", path: "/servicos", icon: Scissors },
        { name: "Agendamentos", path: "/agendamentos", icon: Calendar },
        { name: "Configurações", path: "/configuracoes", icon: Settings },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#07060a]/40 border-b border-white/6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-indigo-500 flex items-center justify-center">
              {/* <Building2 className="w-6 h-6 text-white" /> */}
              <span className="text-white font-bold">SG</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              Service<span className="text-indigo-400">Gate</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-gray-800"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Theme Toggle + User Menu */}
          <div className="flex items-center gap-3">

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-white">{userName}</div>
                  <div className="text-xs text-gray-400">
                    {userType === "admin" ? "Admin Master" : companyName}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                  {userName.charAt(0)}
                </div>
              </div>

            </div>

            {/* Dark Mode Toggle */}
            <Link
              to={"/login"}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-800 bg-[#0a0a0f]">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? "text-purple-600 bg-gray-800"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden xs:block">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}