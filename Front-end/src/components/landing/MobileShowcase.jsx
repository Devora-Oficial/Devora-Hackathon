import React from "react";
import { motion } from "framer-motion";

export default function MobileShowcase() {
  const textVariant = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const phoneVariant = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-white/2">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXTOS */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-white">
            Controle na palma da mão
          </h3>

          <p className="text-gray-300 mt-4">
            Sistema mobile com notificações, retirada de senha digital, confirmação e gestão de filas em tempo real.
          </p>

          <ul className="mt-6 text-gray-300 space-y-3">
            <li>Notificações push e SMS</li>
            <li>Fila digital para clientes</li>
            <li>Relatórios rápidos em app</li>
          </ul>
        </motion.div>

        {/* CELULAR – BALANÇO SUAVE */}
        <motion.div
          className="flex items-center justify-center"
          variants={phoneVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            style={{ transformOrigin: "bottom center" }} // base fixa
            animate={{
              rotate: [-8, 8, -8], // <— balanço MUITO mais suave
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-56 h-96 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-2xl flex items-center justify-center text-white"
          >
            <div className="text-center px-4">
              <div className="h-6 w-24 bg-white/20 rounded mb-4 mx-auto"></div>
              <div className="h-44 bg-white/10 rounded"></div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
