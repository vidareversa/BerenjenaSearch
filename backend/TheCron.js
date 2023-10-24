const cron            = require('node-cron');
const axios           = require('axios');
const cheerio         = require('cheerio');
const puppeteer       = require('puppeteer');
const { MongoClient } = require('mongodb');

const sitiosWeb = [
  'https://www.google.com',
  'https://www.youtube.com',
  'https://www.facebook.com',
  'https://www.instagram.com',
  'https://www.infobae.com',
  'https://www.twitter.com',
  'https://www.whatsapp.com',
  'https://www.mercadolibre.com.ar',
  'https://www.lanacion.com.ar',
  'https://www.xvideos.com',
  'https://www.google.com.ar',
  'https://www.anses.gob.ar',
  'https://www.clarin.com',
  'https://www.wikipedia.org',
  'https://www.live.com',
  'https://www.xnxx.com',
  'https://www.promiedos.com.ar',
  'https://www.pornhub.com',
  'https://www.argentina.gob.ar',
  'https://www.tycsports.com',
  'https://www.ole.com.ar',
  'https://www.ambito.com',
  'https://www.mdzol.com',
  'https://www.tiktok.com',
  'https://www.tn.com.ar',
  'https://www.netflix.com',
  'https://www.perfil.com',
  'https://www.pagina12.com.ar',
  'https://www.afip.gob.ar',
  'https://www.librefutboltv.com',
  'https://www.yahoo.com',
  'https://www.eldestapeweb.com',
  'https://www.meteored.com.ar',
  'https://www.cronista.com',
  'https://www.linkedin.com',
  'https://www.lavoz.com.ar',
  'https://www.mercadopago.com.ar',
  'https://www.notitimba.com',
  'https://www.cloud.afip.gob.ar',
  'https://www.losandes.com.ar',
  'https://www.pinterest.com',
  'https://www.personal.com.ar',
  'https://www.jugandoonline.com.ar',
  'https://www.claro.com.ar',
  'https://www.openai.com',
  'https://www.stripchat.com',
  'https://www.weather.com',
  'https://www.clarosva.com',
  'https://www.bancainternet.com.ar',
  'https://www.baenegocios.com'
];

async function capturarInformacionSitio(sitio, indice) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1880, height: 1080 });
  
  try {
    const webUrl = sitio;
    await page.goto(webUrl);
    console.log(`Imprimiendo la imagen`);
    const screenshotPath = `./screenshots/imagen${indice}.png`;
    await page.screenshot({ path: screenshotPath });
    const pageTitle = await page.title();
    console.log('Título de la página:', pageTitle);
    const pageDescription = await page.$eval('meta[name="description"]', (element) =>
      element.getAttribute('content')
    );
    console.log('Descripción del sitio web:', pageDescription);
    
    const webpageData = {
      title: pageTitle,
      url: webUrl,
      content: pageDescription,
      screenshotPath: screenshotPath
    };

    const uri = 'mongodb://localhost:27017'; // URI de conexión a tu servidor MongoDB
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db('berenjenawebs'); // Reemplaza 'tu_basededatos' con el nombre de tu base de datos
      const collection = database.collection('webs'); // Reemplaza 'tu_coleccion' con el nombre de tu colección
      const result = await collection.insertOne(webpageData);
      console.log(`Documento insertado con ID: ${result.insertedId}`);
    } catch (err) {
      console.error('Error al conectar a MongoDB:', err);
    } finally {
      await client.close();
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`Screenshot has been captured successfully`);
  }
}

//cron.schedule('* * * * *', () => {
  console.log("Imprimiendo el cron...");
  
  sitiosWeb.forEach(async (sitio, indice) => {
    console.log(`Por imprimir: ${sitio}`);
    await capturarInformacionSitio(sitio, indice);
  });
//});
