import React from "react";
import { motion } from "framer-motion";

export default function Integrations() {
  const items = ["WhatsApp", "API & Webhooks", "PDV & Pagamento", "Google Calendar", "Zapier"];

  const itemVariant = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="integrations" className="py-20 bg-gradient-to-b from-transparent to-white/3">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-white">Integrações que conectam seu negócio</h3>

        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          API aberta e integrações nativas com ferramentas que você já usa.
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              animate={{
                y: [0, -10, 0],
                rotate: i % 2 === 0 ? [0, 1.5, 0] : [0, -1.5, 0]
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="p-4 rounded-lg bg-white/4 border border-white/8 text-gray-200 backdrop-blur-sm"
            >
              {it}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
