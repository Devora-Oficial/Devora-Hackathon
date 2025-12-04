// client/src/App.jsx (CORRIGIDO)
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
// Importe outros componentes de página aqui conforme necessário

import './App.css'; // Opcional: Para estilos globais ou reset

function App() {
  return (
    <>  {/* <-- FRAGMENTO DE ABERTURA */}
      <Navbar />
      
      {/* O div principal agora contém apenas o conteúdo roteado e é o único elemento entre Navbar e Footer */}
      <div style={{ minHeight: 'calc(100vh - 120px)' }}> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h1>404 - Página Não Encontrada</h1>
              <p>A URL que você digitou não existe.</p>
            </div>
          } />
        </Routes>
      </div>
      
      <Footer />
    </>
  );
}

export default App;