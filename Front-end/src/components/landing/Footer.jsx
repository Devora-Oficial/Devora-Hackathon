export default function Footer() {
  return (
    <footer className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <svg width="18" height="18" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">
            Service<span className="text-indigo-400">Gate</span>
          </span>
        </div>

        <p className="text-sm">© {new Date().getFullYear()} ServiceGate. Hackathon Project.</p>
      </div>
    </footer>
  );
}