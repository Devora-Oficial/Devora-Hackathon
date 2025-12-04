import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 text-center 
                   bg-gradient-to-br from-purple-600/20 to-indigo-600/10 
                   border border-white/8 rounded-3xl py-16 shadow-lg 
                   backdrop-blur-sm"
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white"
        >
          Pronto para transformar seu serviço?
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-gray-300 mt-3"
        >
          Teste grátis por 14 dias. Sem cartão de crédito.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 flex justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 160 }}>
            <Link
              to="/register"
              className="px-8 py-3 bg-purple-600 rounded-full text-white 
                         font-semibold shadow-lg hover:bg-purple-500 
                         hover:shadow-purple-900/30 transition"
            >
              Criar conta
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 160 }}>
            <Link
              to="/pricing"
              className="px-8 py-3 border border-white/10 rounded-full text-white 
                         hover:bg-white/10 transition"
            >
              Ver planos
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
