
function App() {
 
  // -- Tela Login --
 
  return (
    <div className="min-h-screen flex bg-slate-700 shadow-xl rounded-b-lg">
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm bg-slate-800 p-14 rounded-2xl shadow-xl border border-slate-800">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Lolgin</h2>
 
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white font-medium mb-1">Emahil</label>
              <input type="email" className="w-full px-3 py-2 border rounded-lg text-white" placeholder="exemplo@exemplo.com" />
            </div>
            <div>
              <label className="block text-sm text-white font-medium mb-1">PASword</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg text-white" placeholder="••••••••" />
            </div>
            <button className="w-full py-2 bg-purple-700 text-white font-semibold rounded-lg">EntraAikk</button>
            <p className="text-center text-sm text-white mt-3 ">Sem Contafdskk <a className="text-purple-600 underline cursor-pointer">Criar ai</a></p>
          </div>
        </div>
      </div>
 
      <div className="w-1/2 relative  overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0  bg-gradient-zen bg-center">
        </div>

        <div className="absolute bg-blue-700"></div>
 
        <div className="relative text-white px-16">
          <h1 className="text-4xl font-bold mb-4 text-white">WelTeCome!! <span className="text-white/90">SLAkk</span></h1>
          <p className="text-white max-w-md">SLA TESTE SLA TESTE SLA TESTE SAL TESTE</p>
        </div>
 
        {/* <button className="absolute top-6 right-6 border border-white/70 text-white px-6 py-2 rounded-full">Deslogar</button> */}
      </div>
    </div>
  )
}
 
export default App