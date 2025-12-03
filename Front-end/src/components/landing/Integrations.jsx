import React from "react";

export default function Integrations() {
  const items = ["WhatsApp", "API & Webhooks", "PDV & Pagamento", "Google Calendar", "Zapier"];
  return (
    <section id="integrations" className="py-20 bg-gradient-to-b from-transparent to-white/3">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-white">Integrações que conectam seu negócio</h3>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">API aberta e integrações nativas com ferramentas que você já usa.</p>

        <div className="mt-8 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((it, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/4 border border-white/8 text-gray-200">{it}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
