import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/6 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="text-sm">© {new Date().getFullYear()} ServiceGate — Todos os direitos reservados</div>
      </div>
    </footer>
  );
}
