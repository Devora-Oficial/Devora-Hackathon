import React from "react";

const Person = ({ name, role }) => (
  <div className="p-4 rounded-2xl bg-white/4 border border-white/8 text-center">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 mx-auto mb-3 flex items-center justify-center text-white">👤</div>
    <div className="font-semibold text-white">{name}</div>
    <div className="text-gray-300 text-sm">{role}</div>
  </div>
);

export default function Team() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <h3 className="text-3xl font-bold text-white">Feito para times reais</h3>
        <p className="text-gray-300 mt-2">Equipe, permissões e visões por função para que ninguém se perca no dia a dia.</p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Person name="Mariana Silva" role="Head de Operações" />
        <Person name="Carlos Rocha" role="Gerente de Unidade" />
        <Person name="Ana Pereira" role="Coordenadora de Agenda" />
      </div>
    </section>
  );
}
