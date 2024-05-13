const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa la biblioteca cors
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // Reemplaza con tu URI de MongoDB
const client = new MongoClient(uri, { useUnifiedTopology: true });

//-------------------------------------------------//
// Ruta para obtener los datos de la base de datos
app.get('/api/webdata', async (req, res) => {
  try {
    await client.connect();
    const database    = client.db('berenjena'); // Reemplaza con el nombre de tu base de datos
    const collection  = database.collection('web'); // Reemplaza con el nombre de tu colección
    //const webData     = await collection.find({}).toArray();
    const searchString = req.query.busqueda;
    const webData = await collection.find({
      $or: [
        { content: { $regex: searchString, $options: 'i' } },
        { title: { $regex: searchString, $options: 'i' } },
        { url: { $regex: searchString, $options: 'i' } }
      ]
    }).toArray();
    res.json(webData);
    
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de la base de datos: '+error });
  } finally {
    await client.close();
  }
});
//-------------------------------------------------//

app.get('/search', async (req, res) => {
  //const { query } = req.query;
  try {
    const response            = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
    const results             = response.data.results; // Los resultados están en response.data.results
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


app.get('/', async (req, res) => {
  try {
    res.status(200).send('Todo pipon x aca');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda.');
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});

const screenshotsPath = path.join(__dirname, 'screenshots'); // Asegúrate de que esta ruta sea la correcta
app.use('/screenshots', express.static(screenshotsPath));