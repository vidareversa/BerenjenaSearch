import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={leftContentStyle}>
          <span>&copy; {new Date().getFullYear()} Berenjena Inc.</span>
        </div>
        <div style={rightContentStyle}>
          <a style={link} href="#">Privacidad</a>
          <a style={link} href="#">Términos</a>
          <a style={link} href="#">Configuración</a>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  background: '#f2f2f2', // Color de fondo gris
  padding: '10px 0',
  fontSize: '14px',
  color: '#333',
  position: 'fixed',
  bottom: 0, // Fija el pie de página en la parte inferior
  width: '100%',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const leftContentStyle = {
  flex: 1,
};

const rightContentStyle = {
  flex: 1,
  textAlign: 'right',
};

const link = {
  display:'inline',
  padding:'5px',
}

export default Footer;