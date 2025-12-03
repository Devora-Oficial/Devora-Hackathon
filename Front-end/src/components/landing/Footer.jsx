import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/6 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} ServiceGate — Todos os direitos reservados</div>
        <div className="flex gap-4 text-sm">
          <a href="/terms" className="hover:text-white">Termos</a>
          <a href="/privacy" className="hover:text-white">Privacidade</a>
          <a href="/contact" className="hover:text-white">Contato</a>
        </div>
      </div>
    </footer>
  );
}
