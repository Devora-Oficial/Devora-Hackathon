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

        {/* CELULAR REALISTA */}
        <motion.div
          className="flex items-center justify-center"
          variants={phoneVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            style={{ transformOrigin: "bottom center" }}
            animate={{ rotate: [-6, 6, -6] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-56 h-96 rounded-[2.5rem] bg-black shadow-[0_0_35px_#7f5cff] border-[6px] border-gray-800 overflow-hidden"
          >
            {/* BOTÕES LATERAIS */}
            <div className="absolute -left-1 top-20 w-1 h-10 bg-gray-700 rounded-r-lg"></div>
            <div className="absolute -left-1 top-36 w-1 h-16 bg-gray-700 rounded-r-lg"></div>

            {/* ALTO-FALANTE */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gray-700 rounded-full"></div>

            {/* CÂMERA FRONTAL REALISTA */}
            <div className="absolute top-4 right-24 w-4 h-4 rounded-full bg-black shadow-inner flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 opacity-70"></div>
              </div>
            </div>

            {/* TELA DO CELULAR */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-500 flex flex-col items-center justify-center px-4">
              <div className="mt-2 h-4 w-20 bg-black rounded mb-auto"></div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
