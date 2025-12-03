export default function Stats() {
  const data = [
    { label: "Empresas", value: "500+" },
    { label: "Usuários", value: "2.5k" },
    { label: "Agendamentos", value: "50k+" },
    { label: "Satisfação", value: "98%" },
  ];

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {data.map((s, i) => (
            <div
              key={i}
              className="p-6 bg-black/20 rounded-xl border border-white/5 backdrop-blur-xl shadow-lg shadow-black/30"
            >
              <div className="text-indigo-300 text-3xl font-bold">{s.value}</div>
              <div className="text-gray-400 text-sm mt-2">{s.label}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}