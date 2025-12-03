import React, { useState } from 'react';
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  LogOut,
  Moon,
  UserCircle2,
  Settings
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Mock data para gráficos
const revenueData = [
  { month: 'Jan', value: 45000 },
  { month: 'Fev', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Abr', value: 61000 },
  { month: 'Mai', value: 75000 },
  { month: 'Jun', value: 68000 },
  { month: 'Jul', value: 85000 },
  { month: 'Ago', value: 95000 },
];

const appointmentsData = [
  { day: 'Seg', value: 12 },
  { day: 'Ter', value: 19 },
  { day: 'Qua', value: 15 },
  { day: 'Qui', value: 25 },
  { day: 'Sex', value: 22 },
  { day: 'Sáb', value: 30 },
  { day: 'Dom', value: 28 },
];

// Navbar Component
function Navbar({ currentUser }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'clients', label: 'Clientes' },
    { id: 'services', label: 'Serviços' },
    { id: 'appointments', label: 'Agendamentos' },
    { id: 'settings', label: 'Configurações' },
  ];

  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <nav className="bg-[#0f0d1a] border-b border-white/5 px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-xl">
            Service<span className="text-indigo-400">Gate</span>
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeItem === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Color Circles */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white/20 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-green-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-cyan-500 hover:scale-110 transition"></button>
            <button className="w-8 h-8 rounded-full bg-yellow-500 hover:scale-110 transition"></button>
          </div>

          {/* Dark Mode Toggle */}
          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition">
            <Moon className="w-5 h-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer">
            <div className="text-right">
              <div className="text-white text-sm font-medium">{currentUser.name}</div>
              <div className="text-gray-400 text-xs">{currentUser.business}</div>
            </div>
            <LogOut className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, change, icon: Icon, color }) {
  const isPositive = change > 0;

  return (
    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-gray-400 text-sm mb-2">{title}</div>
          <div className="text-white text-4xl font-bold mb-1">{value}</div>
          <div className="text-gray-400 text-sm">{subtitle}</div>
        </div>
        <div className={`w-14 h-14 rounded-xl bg-red-500 ${color} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{change}% vs mês anterior
      </div>
    </div>
  );
}

// Chart Card Component
function ChartCard({ title, data, color = "#8b5cf6" }) {
  return (
    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
      <h3 className="text-gray-400 text-sm mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill={`url(#gradient-${title})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const currentUser = {
    name: "João Silva",
    business: "Barbearia Premium"
  };

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "3",
      subtitle: "pendentes",
      change: 8,
      icon: Calendar,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Clientes",
      value: "5",
      subtitle: "cadastrados",
      change: 12,
      icon: Users,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Receita Mensal",
      value: "R$ 35",
      subtitle: "este mês",
      change: 15,
      icon: DollarSign,
      color: "from-indigo-600 to-blue-600"
    },
    {
      title: "Serviços Ativos",
      value: "4",
      subtitle: "de 5 total",
      change: 5,
      icon: TrendingUp,
      color: "from-blue-600 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08060f]">
      <Navbar currentUser={currentUser} />

      <main className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400 text-lg">Visão geral do seu negócio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Receita Mensal (R$)"
            data={revenueData}
            color="#8b5cf6"
          />
          <ChartCard
            title="Agendamentos por Dia"
            data={appointmentsData}
            color="#8b5cf6"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Próximos Agendamentos</h3>
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <div className="text-white font-medium">Corte + Barba</div>
                  <div className="text-gray-400 text-sm">João Santos</div>
                </div>
                <div className="text-indigo-400 text-sm">14:00</div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <div className="text-white font-medium">Corte Simples</div>
                  <div className="text-gray-400 text-sm">Pedro Silva</div>
                </div>
                <div className="text-indigo-400 text-sm">15:30</div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-white font-medium">Barba</div>
                  <div className="text-gray-400 text-sm">Carlos Lima</div>
                </div>
                <div className="text-indigo-400 text-sm">17:00</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Serviços Populares</h3>
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Corte + Barba</span>
                  <span className="text-indigo-400 text-sm">45%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Corte Simples</span>
                  <span className="text-indigo-400 text-sm">30%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Barba</span>
                  <span className="text-indigo-400 text-sm">25%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Novos Clientes</h3>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 py-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">João Santos</div>
                  <div className="text-gray-400 text-xs">Hoje às 14:30</div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                  PS
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Pedro Silva</div>
                  <div className="text-gray-400 text-xs">Ontem às 16:00</div>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-semibold">
                  CL
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Carlos Lima</div>
                  <div className="text-gray-400 text-xs">02/12 às 10:15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}