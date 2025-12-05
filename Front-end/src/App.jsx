import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import Login from './pages/auth/Login'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import Empresas from './pages/admin/Empresas'
import ConfiguracoesAdmin from './pages/admin/ConfiguracoesAdmin'
import DashboardEmpresa from './pages/empresa/DashboardEmpresa'
import Servicos from './pages/empresa/Servicos'
import Agendamentos from './pages/empresa/Agendamentos'
import Configuracoes from './pages/empresa/Configuracoes'

export default function App() {
  return (
    <div className="bg-[#07060a] text-white font-sans min-h-screen">
      <Routes>
        {/* Rota padrão (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        {/* Rotas de auth */}
        <Route path="/login" element={<Login />} />
        {/* Rotas da parte de adm */}
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/configuracoesAdmin" element={<ConfiguracoesAdmin />} />
        {/* Rotas da parte de empresa */}
        <Route path="/dashboardEmpresa" element={<DashboardEmpresa />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </div>
  );
}