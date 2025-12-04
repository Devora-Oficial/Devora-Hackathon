import React from "react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const containerVariant = {
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

const Test = ({ text, name, place }) => (
  <motion.div
    variants={cardVariant}
    className="p-6 rounded-2xl bg-white/4 border border-white/8"
  >
    <p className="text-gray-200">“{text}”</p>

    <div className="mt-4 text-sm text-gray-300 font-semibold">
      {name} <span className="text-gray-400">— {place}</span>
    </div>
  </motion.div>
);

export default function Testimonials() {
  const items = [
    { text: "Reduzimos o tempo de espera em 40% e aumentamos o retorno de clientes.", name: "Lucas M.", place: "Barbearia Corte Fino" },
    { text: "Agendamento e pagamento integrados salvaram nosso fluxo de caixa.", name: "Clara R.", place: "Clínica Viva" },
    { text: "Equipe mais organizada e clientes mais satisfeitos.", name: "Ronaldo P.", place: "Restaurante Bom Sabor" }
  ];

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-white">
          O que nossos clientes dizem
        </h3>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6"
      >
        {items.map((it, i) => (
          <Test key={i} {...it} />
        ))}
      </motion.div>
    </section>
  );
}
