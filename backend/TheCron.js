const cron            = require('node-cron');
const puppeteer       = require('puppeteer');
const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 15; // Puedes ajustar este número según tus necesidades

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
  const browser = await puppeteer.launch({ headless: "new", });
  const page    = await browser.newPage();
  await page.setViewport({ width: 1880, height: 1080 });
  const webUrl  = sitio;
  let screenshotPath = '';

  try {
    try {
      await page.goto(webUrl);
      screenshotPath = `./screenshots/imagen${indice}.png`;
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot de ${sitio} has been captured successfully`);
      
    } catch (err) {
      console.log(`Error al capturar la imagen: ${err.message}`);
      await page.close();
      await browser.close();
      return;
    }

    const pageTitle = await page.title();
    const pageDescription = await page.$eval('meta[name="description"]', (element) =>
      element.getAttribute('content')
    );
    
    const webpageData = {
      title: pageTitle,
      url: webUrl,
      content: pageDescription,
      screenshotPath: screenshotPath
    };
    
    //Mongo DB connect
    const uri = 'mongodb://localhost:27017'; // URI de conexión a tu servidor MongoDB
    const client = new MongoClient(uri, { });
    await client.connect();
    try {
      const database   = client.db('berenjena'); // Reemplaza 'tu_basededatos' con el nombre de tu base de datos
      const collection = database.collection('web'); // Reemplaza 'tu_coleccion' con el nombre de tu colección
      const result     = await collection.insertOne(webpageData);
      console.log(`Documento insertado con ID: ${result.insertedId}`);
    } catch (err) {
      console.error('Error al conectar a MongoDB:', err);
    } finally {
      await client.close();
    }

  } catch (err) {
    console.log(`Error: ${err.message}`);
    // Eliminar el screenshot si no se puede insertar en MongoDB
    if (screenshotPath) {
      const fs = require('fs');
      fs.unlink(screenshotPath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error al eliminar el screenshot:', unlinkError);
        } else {
          console.log('Screenshot eliminado con éxito.');
        }
      });
    }
  } finally {
    await page.close();
    await browser.close();
  }
}

async function existingWebpageF(webUrl) {
  let existingWebpage = false;
  try {
    const uri        = 'mongodb://localhost:27017'; // URI de conexión a tu servidor MongoDB
    const client     = await new MongoClient(uri, {});
    await client.connect();
    const database   = client.db('berenjenawebs');
    const collection = database.collection('webs');
    existingWebpage  = await collection.findOne({ url: webUrl });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  
  let webpageExists = !!existingWebpage;
  return webpageExists;
}

//cron.schedule('* * * * *', () => {
async function main() {
  for (const sitio of sitiosWeb) {
    console.log('%c-------------------------', 'color: red; font-size: larger');
    console.log(`%cAnalizar el sitio: ${sitio}`, 'color: red; font-size: larger');
    let existingWebpage = await existingWebpageF(sitio);
    console.log(`BIEN, EXISTE EN LA BASE? : ${existingWebpage}`);
    if (existingWebpage == false) {
      console.log(`BIEN, NO EXISTE EN NUESTRA BASE DE DATOS: ${sitio}`);
      await capturarInformacionSitio(sitio, sitiosWeb.indexOf(sitio));
    } else {
      console.log(`YA EXISTE EN LA BASE: ${existingWebpage}`);
    }
  }
}
main();
//});