import React, { useState } from 'react';
import './Buscador.css'; // Importa el archivo CSS

function Buscador({ onSearch }) {
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //onSearch(busqueda);
  };

  return (
    <div className="buscador-container">
      <img src={process.env.PUBLIC_URL + '/images/BerenjenaSearch-icon'} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleChange}
          className='search-input'
        />
        <button type="submit" className='search-button'>Buscar</button>
      </form>
    </div>
  );
}

export default Buscador;