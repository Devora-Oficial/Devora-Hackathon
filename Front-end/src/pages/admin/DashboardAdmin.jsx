// src/pages/DashboardAdmin.jsx
import React from 'react';
import { motion } from "framer-motion";

import {
  Building2,
  Users,
  DollarSign,
  Server,
  TrendingUp,
  Activity,
  ShieldCheck,
} from 'lucide-react';

import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import NavbarManage from '../../components/NavbarManage';

// ======================================
// ANIMAÇÕES (mesmas do seu outro painel)
// ======================================
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listItemVariant = {
  hidden: { opacity: 0, x: -10 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" }
  }),
};

// ======================================
// DADOS
// ======================================

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

// ======================================
// COMPONENTES
// ======================================

function StatCard({ title, value, subtitle, change, icon: Icon, color, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="show"
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
      className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h2 className="text-white text-4xl font-bold">{value}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      <p className={`text-sm font-medium ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
        {change >= 0 ? "+" : ""}{change}% vs mês anterior
      </p>
    </motion.div>
  );
}

function ChartCard({ title, data, color = "#8b5cf6", index }) {
  const safeId = `grad-${title.replace(/\s+/g, "-")}`;

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="show"
      className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6"
    >
      <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-400 text-sm mb-6">
        {title}
      </motion.h3>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={safeId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill={`url(#${safeId})`}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}

// ======================================
// DASHBOARD ADMIN
// ======================================

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

  const tipoConta = "admin";

  return (
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage userType={tipoConta} />

      <main className="max-w-[1600px] mx-auto p-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Dashboard ADM</h1>
          <p className="text-gray-400 text-lg">Visão geral do sistema completo</p>
        </motion.div>

        {/* Cards Principais */}
        <motion.div variants={containerVariant} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} index={i} />
          ))}
        </motion.div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Crescimento de Empresas" data={companiesGrowth} color="#8b5cf6" index={0} />
          <ChartCard title="Crescimento de Usuários" data={usersGrowth} color="#06b6d4" index={1} />
        </div>

        {/* Listas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* Últimas Empresas Criadas */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Últimas Empresas Criadas</h3>
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>

            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
              {[
                { name: "Studio Hair", date: "Hoje - 14:20" },
                { name: "TechWare", date: "Ontem - 10:45" },
                { name: "FitLife", date: "02/12 - 16:00" },
              ].map((c, i) => (
                <motion.div key={i} custom={i} variants={listItemVariant} className="py-3 border-b border-white/5">
                  <p className="text-white font-medium">{c.name}</p>
                  <p className="text-gray-400 text-sm">{c.date}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Atividades Recentes */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Atividades Recentes</h3>
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-3">
              {[
                { text: "Novo usuário registrado", when: "Há 1 hora" },
                { text: "Empresa FitLife atualizou plano", when: "Há 3 horas" },
                { text: "Backup do sistema concluído", when: "02/12 - 23:10" },
              ].map((a, i) => (
                <motion.div key={i} custom={i} variants={listItemVariant} initial="hidden" animate="show" className="py-3 border-b border-white/5">
                  <p className="text-white text-sm">{a.text}</p>
                  <p className="text-gray-400 text-xs">{a.when}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Planos */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Planos Utilizados</h3>
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-4">
              {[
                { name: "Plano Basic", percent: 45, colors: "from-indigo-600 to-purple-600" },
                { name: "Plano Pro", percent: 35, colors: "from-purple-600 to-pink-600" },
                { name: "Plano Enterprise", percent: 20, colors: "from-blue-600 to-cyan-600" },
              ].map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-sm">{p.name}</span>
                    <span className="text-indigo-400 text-sm">{p.percent}%</span>
                  </div>

                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.percent}%` }}
                      transition={{ duration: 1 + i * 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${p.colors}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
