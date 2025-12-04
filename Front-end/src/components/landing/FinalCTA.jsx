import React from "react";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-white/8 rounded-3xl py-16 shadow-lg">
        <h3 className="text-3xl font-bold text-white">Pronto para transformar seu serviço?</h3>
        <p className="text-gray-300 mt-3">Teste grátis por 14 dias. Sem cartão de crédito.</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register" className="px-8 py-3 bg-purple-600 rounded-full text-white font-semibold shadow-lg">Criar conta</Link>
          <Link to="/pricing" className="px-8 py-3 border border-white/10 rounded-full text-white">Ver planos</Link>
        </div>
      </div>
    </section>
  );
}
