import React from "react";

export default function Hero() {
  return (
    <section className="pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">

        {/* Left */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs mb-4 border border-indigo-700/30">
            Plataforma SaaS Multi-Empresa
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Gerencie seus serviços <br/>
            <span className="text-indigo-400">de forma inteligente</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-md">
            Plataforma completa para gestão de barbearias, clínicas, academias e muito mais.
            Todas as ferramentas que você precisa, em um só lugar.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#signup"
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-900/40 flex items-center gap-2"
            >
              Começar Gratuitamente
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <a
              href="#login"
              className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white transition"
            >
              Já tenho conta
            </a>
          </div>
        </div>

        {/* Right - Mockup */}
        <div className="md:col-span-6 flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl p-6 bg-[#120f1b] border border-white/5 shadow-2xl shadow-purple-900/20">
            <div className="w-full h-64 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center border border-white/10 shadow-inner">
              <span className="text-indigo-200/70">[Mockup do painel]</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}