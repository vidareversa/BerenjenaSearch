const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa la biblioteca cors

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    res.status(200).send('Todo pipon x aca');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda.');
  }
});

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');
    const results = response.data.results; // Los resultados están en response.data.results
    const additionalResponses = [];

    for (const result of results) {
      const additionalResponse = await axios.get(result.url);
      let newPokemon = {
        'name' : additionalResponse.data.name, 'url':  result.url , 'foto': additionalResponse.data.sprites.front_default
      };
      additionalResponses.push(newPokemon);
    }
    
    res.json(additionalResponses);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda.'+error);
  }

});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});