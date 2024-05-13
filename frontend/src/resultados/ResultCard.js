import React from 'react';
import './ResultCard.css';

function ResultCard({ title, description, url, foto }) {
  
  const handleCardClick = () => {
    window.open(url, '_blank'); // Abre la URL en una nueva pestaña
  };


  return (
      <div className="result-card" onClick={handleCardClick}>
        <img src={foto} alt={title} className="result-image" />
        <p className="result-description">{description}</p>
        
        <div className="result-card-title">
          <strong>
            <label className="result-title">{title}</label>
          </strong>
        </div>
      </div>
  );
}

export default ResultCard;