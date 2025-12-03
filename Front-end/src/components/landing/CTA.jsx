export default function CTA() {
  return (
    <section className="pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-12 rounded-2xl border border-white/5 shadow-2xl shadow-purple-900/20">
        <h3 className="text-3xl font-bold text-white">Pronto para transformar seu negócio?</h3>
        <p className="mt-3 text-gray-300">Crie sua conta e comece agora mesmo.</p>

        <a
          href="#signup"
          className="inline-block mt-6 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium shadow-lg shadow-indigo-900/40"
        >
          Criar Conta Gratuita
        </a>
      </div>
    </section>
  );
}