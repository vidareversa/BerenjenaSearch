import React, { useState } from 'react';
import './Buscador.css'; // Importa el archivo CSS
import ResultList from '../resultados/ResultList';

function Buscador({ onSearch }) {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const imagePath = process.env.PUBLIC_URL + '/images/BerenjenaSearch-icon.png';

  const buscarDatos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/webdata?busqueda=${busqueda}`);
      if (response.ok) {
        const data = await response.json();
        setResultado(data);
      } else {
        console.error('Error al obtener los datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      buscarDatos();
    }
  };
  
  return (
    <div className={`buscador-container ${resultado ? 'show-results' : ''}`}>
      <div className='header'>
        <img src={imagePath} alt="Logo" />
        <h1>Berenjena Search</h1>
      </div>
      <div className='search-input-container'>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyPress={handleInputKeyPress} 
          className='search-input'
        />
        <input type="button" value="Buscar" className='search-button' onClick={buscarDatos}/>
      </div>
      {resultado && (
        <div>
          <ResultList results={resultado} />  {/* Pasa los resultados como prop a ResultList */}
        </div>
      )}
    </div>
  );
}

export default Buscador;