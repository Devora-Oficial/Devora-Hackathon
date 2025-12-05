// src/components/NavbarManage.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Scissors, Calendar, Settings, Moon, Sun, LogOut } from "lucide-react";

export default function NavbarManage({ isDarkMode, setIsDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nome: "Usuário",
    email: "",
  });
  const [userType, setUserType] = useState("empresa");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedRole = localStorage.getItem("role");
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedUserData) setUserData(JSON.parse(storedUserData));
    if (storedRole) setUserType(storedRole === "admin" ? "admin" : "company");
  }, []);

  const navItems = userType === "admin"
    ? [
        { name: "Dashboard", path: "/dashboardAdmin", icon: LayoutDashboard },
        { name: "Empresas", path: "/empresas", icon: Building2 },
        { name: "Configurações", path: "/configuracoesAdmin", icon: Settings },
      ]
    : [
        { name: "Dashboard", path: "/dashboardEmpresa", icon: LayoutDashboard },
        { name: "Serviços", path: "/servicos", icon: Scissors },
        { name: "Agendamentos", path: "/agendamentos", icon: Calendar },
        { name: "Configurações", path: "/configuracoes", icon: Settings },
      ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <header className={`${isDarkMode ? "bg-[#07060a]/80 border-white/6" : "bg-white/90 border-gray-200"} w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold">SG</span>
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block" style={{ color: isDarkMode ? "white" : "#1f2937" }}>
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
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300
                    ${active ? (isDarkMode ? "text-white" : "text-gray-900") : (isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900")}
                  `}
                >
                  <span className={`absolute bottom-0 right-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ${active ? "w-full" : ""}`} />
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} p-2 rounded-lg transition-colors duration-300`}
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-white">{userData.nome}</div>
                  <div className="text-xs text-gray-400">
                    {userData.email}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                  {userData.nome.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                {userData.nome.charAt(0).toUpperCase()}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={`${isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"} p-2 rounded-lg transition-colors duration-300`}
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isDarkMode ? "bg-[#0a0a0f] border-gray-800" : "bg-white/90 border-gray-200"} md:hidden border-t transition-colors duration-300`}>
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-300
                  ${active ? "text-purple-600 bg-gray-200/20" : isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}
                `}
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
