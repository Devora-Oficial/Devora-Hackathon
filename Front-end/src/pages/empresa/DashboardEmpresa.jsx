// src/pages/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import NavbarManage from "../../components/NavbarManage";

// Mock data para gráficos
const revenueData = [
  { month: "Jan", value: 45000 },
  { month: "Fev", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Abr", value: 61000 },
  { month: "Mai", value: 75000 },
  { month: "Jun", value: 68000 },
  { month: "Jul", value: 85000 },
  { month: "Ago", value: 95000 }
];

const appointmentsData = [
  { day: "Seg", value: 12 },
  { day: "Ter", value: 19 },
  { day: "Qua", value: 15 },
  { day: "Qui", value: 25 },
  { day: "Sex", value: 22 },
  { day: "Sáb", value: 30 },
  { day: "Dom", value: 28 }
];

// Dados adicionais
const nextAppointments = [
  { title: "Corte + Barba", client: "João Santos", time: "14:00" },
  { title: "Corte Simples", client: "Pedro Silva", time: "15:30" },
  { title: "Barba", client: "Carlos Lima", time: "17:00" }
];

const popularServices = [
  { name: "Corte + Barba", percent: 45, colorFrom: "from-indigo-600", colorTo: "to-purple-600" },
  { name: "Corte Simples", percent: 30, colorFrom: "from-purple-600", colorTo: "to-pink-600" },
  { name: "Barba", percent: 25, colorFrom: "from-blue-600", colorTo: "to-cyan-600" }
];

const newClients = [
  { initials: "JS", name: "João Santos", when: "Hoje às 14:30" },
  { initials: "PS", name: "Pedro Silva", when: "Ontem às 16:00" },
  { initials: "CL", name: "Carlos Lima", when: "02/12 às 10:15" }
];

// Variants
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const listItemVariant = {
  hidden: { opacity: 0, x: -10 },
  show: i => ({ opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" } })
};

// Stat Card Component
function StatCard({ title, value, subtitle, change, icon: Icon, color, index }) {
  const isPositive = change > 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="show"
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.22 } }}
      className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-gray-400 text-sm mb-2">{title}</div>
          <div className="text-white text-4xl font-bold mb-1">{value}</div>
          <div className="text-gray-400 text-sm">{subtitle}</div>
        </div>

        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      <div className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}
        {change}% vs mês anterior
      </div>
    </motion.div>
  );
}

// Chart Card Component
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
                <stop offset="5%" stopColor={color} stopOpacity={0.28} />
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

export default function Dashboard() {
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
    <div className="min-h-screen bg-[#08060f] pt-28 md:pt-16">
      <NavbarManage />

      <main className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400 text-lg">Visão geral do seu negócio</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={containerVariant} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Receita Mensal (R$)" data={revenueData} color="#8b5cf6" index={0} />
          <ChartCard title="Agendamentos por Dia" data={appointmentsData} color="#06b6d4" index={1} />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Próximos Agendamentos */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Próximos Agendamentos</h3>
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>

            <motion.div initial="hidden" animate="show" variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } }
            }}>
              {nextAppointments.map((a, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={listItemVariant}
                  initial="hidden"
                  animate="show"
                  className="flex items-center justify-between py-3 border-b border-white/5"
                >
                  <div>
                    <div className="text-white font-medium">{a.title}</div>
                    <div className="text-gray-400 text-sm">{a.client}</div>
                  </div>
                  <div className="text-indigo-400 text-sm">{a.time}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Serviços Populares */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Serviços Populares</h3>
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-4">
              {popularServices.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">{s.name}</span>
                    <span className="text-indigo-400 text-sm">{s.percent}%</span>
                  </div>

                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.percent}%` }}
                      transition={{ duration: 1.1 + i * 0.15, ease: "easeOut" }}
                      className={`h-full rounded-full bg-linear-to-r ${s.colorFrom} ${s.colorTo}`}
                      style={{ willChange: "width" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Novos Clientes */}
          <motion.div variants={cardVariant} initial="hidden" animate="show" className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Novos Clientes</h3>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>

            <motion.div initial="hidden" animate="show" variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } }
            }}>
              {newClients.map((c, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={listItemVariant}
                  initial="hidden"
                  animate="show"
                  className="flex items-center gap-3 py-3 border-b border-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {c.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{c.name}</div>
                    <div className="text-gray-400 text-xs">{c.when}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
