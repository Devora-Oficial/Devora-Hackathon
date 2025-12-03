export default function Features() {
  const features = [
    { title: "Multi-Empresa", desc: "Gerencie múltiplas empresas em uma única plataforma." },
    { title: "Gestão de Clientes", desc: "Cadastro completo e acompanhamentos fáceis." },
    { title: "Agendamentos", desc: "Sistema automatizado com notificações." },
    { title: "Relatórios", desc: "Dashboards em tempo real para decisões rápidas." },
    { title: "Segurança", desc: "Autenticação JWT + controle de permissões." },
    { title: "Performance", desc: "Interface rápida em qualquer dispositivo." },
  ];

  return (
    <section id="features" className="pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-white">Tudo que você precisa</h2>
        <p className="mt-3 text-gray-400">
          Ferramentas modernas para gerenciar seu negócio de forma inteligente.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-xl shadow-xl shadow-black/30"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-700/50 flex items-center justify-center mb-4">
                <svg width="20" height="20" stroke="#C7B8FF" fill="none" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>

              <h3 className="text-white font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}