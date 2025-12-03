import React from "react";

const Feature = ({ icon, title, text }) => (
  <div className="p-6 rounded-2xl bg-white/4 border border-white/8 hover:shadow-lg hover:shadow-purple-900/20 transition">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{text}</p>
  </div>
);

export default function FeatureStrip() {
  const items = [
    { icon: "📅", title: "Agendamentos inteligentes", text: "Reserve, reagende e otimize horários automaticamente." },
    { icon: "🔔", title: "Notificações & SMS", text: "Lembretes automáticos via SMS/WhatsApp e push." },
    { icon: "⚙️", title: "Automação de filas", text: "Priorize atendimentos e minimize tempos de espera." },
    { icon: "👥", title: "Equipe & permissões", text: "Controle de funções, escalas e performance." },
    { icon: "💳", title: "Pagamentos integrados", text: "Cobre no app, PDV, ou por link." },
    { icon: "📈", title: "Relatórios inteligentes", text: "Métricas que mostram o desempenho do seu negócio." }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">O que o ServiceGate faz por você</h3>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">Ferramentas pensadas para negócios de serviço — do agendamento ao pagamento.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => <Feature key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
}
