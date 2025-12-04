import React from "react";
import { motion } from "framer-motion";

const PanelCard = ({ title, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white/4 border border-white/8 shadow-md hover:shadow-purple-900/30 transition"
  >
    <h4 className="text-white font-semibold mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{text}</p>
    <div className="mt-4 h-24 bg-white/6 rounded"></div>
  </motion.div>
);

export default function Panels() {
  return (
    <section id="panels" className="py-20 bg-gradient-to-b from-transparent to-white/2">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">Painéis inteligentes</h3>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            Visualize a operação em tempo real — filas, horários, ganhos e performance da equipe.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <PanelCard
            title="Painel de Filas"
            text="Tempo médio de espera, número de clientes em fila e avisos prioritários."
            delay={0.1}
          />
          <PanelCard
            title="Agenda & Recursos"
            text="Visão por funcionário, sala ou recurso — tudo sincronizado."
            delay={0.2}
          />
          <PanelCard
            title="Financeiro"
            text="Vendas, cancelamentos e relatórios de receita por período."
            delay={0.3}
          />
        </div>

      </div>
    </section>
  );
}
