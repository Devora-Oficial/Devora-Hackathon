import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import Empresas from './pages/admin/Empresas'
import ConfiguracoesAdmin from './pages/admin/ConfiguracoesAdmin'
import Relatorios from './pages/admin/Relatorios'
import Usuarios from './pages/admin/Usuarios'
import DashboardEmpresa from './pages/empresa/DashboardEmpresa'
import Clientes from './pages/empresa/Clientes'
import Servicos from './pages/empresa/Servicos'
import Agendamentos from './pages/empresa/Agendamentos'
import Configuracoes from './pages/empresa/Configuracoes'
import PerfilEmpresa from './pages/empresa/PerfilEmpresa'

export default function App() {
  return (
    <div className="bg-[#07060a] text-white font-sans min-h-screen">
      <Routes>
        {/* Rota padrão (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        {/* Rotas de auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rotas da parte de adm */}
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/configuracoesAdmin" element={<ConfiguracoesAdmin />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/usuarios" element={<Usuarios />} />
        {/* Rotas da parte de empresa */}
        <Route path="/dashboardEmpresa" element={<DashboardEmpresa />} />
        <Route path="/clientes" element={<ConfiguracoesAdmin />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/perfilEmpresa" element={<PerfilEmpresa />} />
      </Routes>
    </div>
  );
}