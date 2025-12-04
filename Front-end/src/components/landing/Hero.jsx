import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 relative overflow-hidden">
      <div className="absolute -left-40 -top-24 w-[720px] h-[720px] rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-[-200px] top-10 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 opacity-10 blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            O futuro da gestão de serviços para{" "}
            <span className="text-purple-400">barbearias, clínicas e restaurantes</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-300 max-w-xl"
          >
            Agendamentos, filas digitais, gestão de equipe, pagamentos e insights automáticos — tudo numa plataforma só, feita pra negócios de serviço.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
          >
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-xl shadow-purple-900/40 hover:scale-[1.02] transition"
            >
              Começar grátis
            </Link>

            <a
              href="#features"
              className="px-8 py-3 border border-white/10 rounded-full text-white hover:border-purple-400 transition flex items-center justify-center"
            >
              Ver recursos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex gap-6 items-center justify-center lg:justify-start text-sm text-gray-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">🚀</div>
              <div>
                <div className="text-white font-semibold">Rápido para começar</div>
                <div className="text-gray-400 text-xs">Configuração em minutos</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">🔒</div>
              <div>
                <div className="text-white font-semibold">Segurança empresarial</div>
                <div className="text-gray-400 text-xs">Dados protegidos</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex items-center justify-center"
        >
          <div className="w-[380px] md:w-[520px] lg:w-[560px] p-6 rounded-3xl bg-gradient-to-br from-white/3 to-white/2 border border-white/8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <div className="h-3 w-24 rounded-full bg-white/10"></div>
              <div className="h-3 w-10 rounded-full bg-white/10"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-white/6">
                <div className="h-6 w-24 bg-white/10 rounded mb-3"></div>
                <div className="h-8 bg-white/8 rounded"></div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 border border-white/6">
                <div className="h-6 w-20 bg-white/10 rounded mb-3"></div>
                <div className="h-8 bg-white/8 rounded"></div>
              </div>
              <div className="col-span-2 p-3 rounded-lg bg-white/4 border border-white/6">
                <div className="h-3 w-40 bg-white/10 rounded mb-3"></div>
                <div className="h-28 bg-white/8 rounded"></div>
              </div>
            </div>

            <div className="absolute -left-8 -bottom-6 w-36 h-36 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 opacity-40 blur-xl"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
