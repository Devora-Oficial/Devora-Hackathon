import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, price, bullets, featured }) => (
  <div
    className={`p-6 rounded-2xl border transition duration-300
      ${featured
        ? "bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border-purple-400 shadow-lg shadow-purple-900/30"
        : "bg-white/4 border-white/8"
      }`}
  >
    <h4 className="text-xl font-semibold text-white">{title}</h4>

    {/* Preço com destaque suave */}
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 160, damping: 14 }}
      className="mt-4 text-3xl font-bold text-white
                 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]
                 transition-all duration-300"
    >
      {price}
    </motion.div>

    <ul className="mt-4 text-gray-300 space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="text-sm">• {b}</li>
      ))}
    </ul>

    <button
      className={`mt-6 w-full py-2 rounded-full font-semibold transition
        ${featured
          ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/20"
          : "bg-white/6 text-white hover:bg-white/10"
        }`}
    >
      Escolher
    </button>
  </div>
);

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h3 className="text-3xl font-bold text-white">Planos simples. Preços justos.</h3>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Escolha o plano que cabe no seu negócio — comece grátis e escale quando quiser.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        <Card
          title="Free"
          price="R$0/mês"
          bullets={[
            "1 estabelecimento",
            "Agendamentos básicos",
            "Notificações limitadas"
          ]}
        />

        <Card
          title="Pro"
          price="R$49/mês"
          bullets={[
            "Multi-unidade",
            "Filas e automações",
            "Integrações"
          ]}
          featured
        />

        <Card
          title="Enterprise"
          price="Sob consulta"
          bullets={[
            "Onboarding dedicado",
            "SLA",
            "Integrações personalizadas"
          ]}
        />
      </div>
    </section>
  );
}
