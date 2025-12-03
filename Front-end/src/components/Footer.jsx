// client/src/components/Footer.jsx
function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#282c34', 
      color: 'white', 
      textAlign: 'center', 
      padding: '1rem', 
      position: 'fixed', 
      bottom: 0, 
      width: '100%' 
    }}>
      <p>&copy; {new Date().getFullYear()} Meu Aplicativo. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;