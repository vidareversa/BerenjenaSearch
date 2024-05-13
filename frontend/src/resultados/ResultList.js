import React from 'react';
import ResultCard from './ResultCard'; // Importa el componente de tarjeta
import './ResultList.css';

function ResultList({ results }) {
  return (
    <div className="buscador-search-results" >
      {results.map((result, index) => (
        <ResultCard
          key={index}
          title={result.title}
          description={result.content}
          url={result.url}
          foto={'http://localhost:5000/'+result.screenshotPath}
        />
      ))}
    </div>
  );
}

export default ResultList;