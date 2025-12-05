import React from "react";
import { motion } from "framer-motion";

export default function Automation() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* ===== Left: Text ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white">
            Automação que reduz espera e aumenta receita
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 mt-4"
          >
            Use regras para priorizar clientes, reagendar automaticamente, enviar lembretes e liberar slots vazios.
            Regras simples ou avançadas — você decide.
          </motion.p>

          {/* List Items - cascading animation */}
          <ul className="mt-6 grid gap-3">
            {[
              {
                icon: "⚡",
                title: "Reagendamento automático",
                desc: "Preencha horários vagos e reduz o no-show."
              },
              {
                icon: "🔁",
                title: "Prioridade personalizada",
                desc: "Defina regras por cliente, plano ou tipo de serviço."
              }
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 + i * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-gray-200"
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-sm text-gray-300">{item.desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ===== Right: Mockup ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="p-6 rounded-2xl bg-white/4 border border-white/8">
            <div className="h-12 w-48 bg-white/10 rounded mb-4"></div>
            <div className="h-44 bg-white/8 rounded"></div>
            <div className="mt-4 text-sm text-gray-300">
              Exemplo: reagendar automaticamente cliente VIP para próximo horário disponível.
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
