import React, { useState } from 'react';
import './App.css';
import Buscador from './buscador/Buscador';
import Footer from './footer/Footer'; // Ajusta la ruta al archivo del pie de página

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <Buscador/>
      <Footer/>
    </div>
  );
}

export default App;