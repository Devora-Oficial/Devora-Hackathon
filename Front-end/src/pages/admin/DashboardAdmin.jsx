import React from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Server,
  TrendingUp,
  LogOut,
  Activity,
  ShieldCheck,
} from 'lucide-react';

import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import NavbarManage from '../../components/NavbarManage';

// Mock Data – Admin Version
const companiesGrowth = [
  { month: 'Jan', value: 12 },
  { month: 'Fev', value: 18 },
  { month: 'Mar', value: 22 },
  { month: 'Abr', value: 30 },
  { month: 'Mai', value: 35 },
  { month: 'Jun', value: 40 },
  { month: 'Jul', value: 52 },
  { month: 'Ago', value: 58 },
];

const usersGrowth = [
  { month: 'Jan', value: 120 },
  { month: 'Fev', value: 150 },
  { month: 'Mar', value: 180 },
  { month: 'Abr', value: 230 },
  { month: 'Mai', value: 260 },
  { month: 'Jun', value: 300 },
  { month: 'Jul', value: 350 },
  { month: 'Ago', value: 400 },
];

// Generic Card Component
function StatCard({ title, value, subtitle, change, icon: Icon, color }) {
  const positive = change >= 0;

  return (
    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h2 className="text-white text-4xl font-bold">{value}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <div className={`w-14 h-14 rounded-xl bg-red-500 ${color} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      <p className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive && '+'}{change}% vs mês anterior
      </p>
    </div>
  );
}

// Chart Component
function ChartCard({ title, data, color = "#8b5cf6" }) {
  return (
    <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
      <h3 className="text-gray-400 text-sm mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={title} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill={`url(#${title})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const stats = [
    {
      title: "Empresas no Sistema",
      value: "128",
      subtitle: "ativas",
      change: 12,
      icon: Building2,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Usuários Totais",
      value: "842",
      subtitle: "ativos na plataforma",
      change: 18,
      icon: Users,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 12.450",
      subtitle: "este mês",
      change: 9,
      icon: DollarSign,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Servidores Online",
      value: "5",
      subtitle: "todos operacionais",
      change: 0,
      icon: Server,
      color: "from-cyan-600 to-teal-600"
    },
  ];

const tipoConta = 'admin';

  return (
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage userType={tipoConta}/>

      <main className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Dashboard ADM</h1>
          <p className="text-gray-400 text-lg">Visão geral do sistema completo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Crescimento de Empresas" data={companiesGrowth} color="#8b5cf6" />
          <ChartCard title="Crescimento de Usuários" data={usersGrowth} color="#8b5cf6" />
        </div>

        {/* More Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Últimas Empresas Criadas */}
          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Últimas Empresas Criadas</h3>
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-3">
              {[
                { name: "Studio Hair", date: "Hoje - 14:20" },
                { name: "TechWare", date: "Ontem - 10:45" },
                { name: "FitLife", date: "02/12 - 16:00" },
              ].map((c, i) => (
                <div key={i} className="py-3 border-b border-white/5">
                  <p className="text-white font-medium">{c.name}</p>
                  <p className="text-gray-400 text-sm">{c.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Atividades Recentes */}
          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Atividades Recentes</h3>
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-3">
              <div className="py-3 border-b border-white/5">
                <p className="text-white text-sm">Novo usuário registrado</p>
                <p className="text-gray-400 text-xs">Há 1 hora</p>
              </div>
              <div className="py-3 border-b border-white/5">
                <p className="text-white text-sm">Empresa FitLife atualizou plano</p>
                <p className="text-gray-400 text-xs">Há 3 horas</p>
              </div>
              <div className="py-3">
                <p className="text-white text-sm">Backup do sistema concluído</p>
                <p className="text-gray-400 text-xs">02/12 - 23:10</p>
              </div>
            </div>
          </div>

          {/* Planos Utilizados */}
          <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Planos Utilizados</h3>
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm">Plano Basic</span>
                  <span className="text-indigo-400 text-sm">45%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-indigo-600 to-purple-600 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm">Plano Pro</span>
                  <span className="text-indigo-400 text-sm">35%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-purple-600 to-pink-600 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm">Plano Enterprise</span>
                  <span className="text-indigo-400 text-sm">20%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-blue-600 to-cyan-600 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}