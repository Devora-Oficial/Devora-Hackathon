import React from "react";

export default function Automation() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-white">Automação que reduz espera e aumenta receita</h3>
          <p className="text-gray-300 mt-4">
            Use regras para priorizar clientes, reagendar automaticamente, enviar lembretes e liberar slots vazios. Regras simples ou avançadas — você decide.
          </p>

          <ul className="mt-6 grid gap-3">
            <li className="flex items-start gap-3 text-gray-200">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center">⚡</div>
              <div>
                <div className="font-semibold text-white">Reagendamento automático</div>
                <div className="text-sm text-gray-300">Preencha horários vagos e reduz o no-show.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center">🔁</div>
              <div>
                <div className="font-semibold text-white">Prioridade personalizada</div>
                <div className="text-sm text-gray-300">Defina regras por cliente, plano ou tipo de serviço.</div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div className="p-6 rounded-2xl bg-white/4 border border-white/8">
            <div className="h-12 w-48 bg-white/10 rounded mb-4"></div>
            <div className="h-44 bg-white/8 rounded"></div>
            <div className="mt-4 text-sm text-gray-300">Exemplo: reagendar automaticamente cliente VIP para próximo horário disponível.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
