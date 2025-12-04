import React from "react";

export default function MobileShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-white/2">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-white">Controle na palma da mão</h3>
          <p className="text-gray-300 mt-4">App mobile com notificações, retirada de senha digital, confirmação e gestão de filas em tempo real.</p>

          <ul className="mt-6 text-gray-300 space-y-3">
            <li>Notificações push e SMS</li>
            <li>Fila digital para clientes</li>
            <li>Relatórios rápidos em app</li>
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-56 h-96 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-2xl flex items-center justify-center text-white">
            <div className="text-center px-4">
              <div className="h-6 w-24 bg-white/20 rounded mb-4 mx-auto"></div>
              <div className="h-44 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
