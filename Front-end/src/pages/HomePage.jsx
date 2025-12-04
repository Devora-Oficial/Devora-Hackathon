// client/src/pages/HomePage.jsx

function HomePage() {
  return (
    <div className="p-8 text-center bg-gray-100 h-screen"> 
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Bem-vindo à Nossa Landing Page!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Este é o conteúdo principal da sua página inicial.
      </p>
      
      {/* Exemplo de botão estilizado com Tailwind */}
      <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300">
        Comece Agora
      </button>

      {/* ... o restante do seu código ... */}
    </div>
  );
}

export default HomePage;