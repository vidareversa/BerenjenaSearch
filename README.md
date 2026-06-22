# BerenjenaSearch

![BerenjenaSearch](berenjenasearch.jfif)

BerenjenaSearch es un proyecto experimental de un buscador web ordinario pero que captura screenshots de las web que indexa. 

Frontend en React y un backend en Node.js/Express encargado de obtener y procesar datos web.

**Estructura**
- `backend/` — servidor Node.js que obtiene datos (puppeteer, cheerio), cron jobs y API.
- `frontend/` — aplicación creada con Create React App (UI, componente `Buscador`).
- `berenjenasearch.jfif` — imagen/logo principal del proyecto (usada en este README).

**Requisitos**
- Node.js (>=16 recommended)
- npm
- MongoDB (opcional, según configuración del backend)

**Instalación y ejecución**

1) Backend

```bash
cd backend
npm install
# Iniciar el servidor (ejemplo):
node TheServer.js
# O con nodemon si lo prefieres:
npx nodemon TheServer.js
```

El backend expone una API en `http://localhost:5000` que el frontend consulta en `GET /api/webdata?busqueda=...`.

2) Frontend

```bash
cd frontend
npm install
npm start
```

El frontend corre por defecto en `http://localhost:3000` y el componente `Buscador` hace peticiones al backend en `http://localhost:5000`.

**Archivos clave**
- `backend/TheServer.js` — punto de entrada del servidor.
- `backend/TheCron.js` — tareas programadas (node-cron).
- `frontend/src/buscador/Buscador.js` — componente principal de búsqueda.
- `frontend/src/resultados/ResultList.js` — renderiza los resultados.

**Dependencias principales**
- Backend: `express`, `puppeteer`, `cheerio`, `mongodb`, `node-cron`, `axios`.
- Frontend: `react`, `react-dom`, `react-scripts`, `@mui/material`, `bootstrap`.

**Notas**
- Ajusta variables de entorno o puertos si tu entorno local ya usa 3000/5000.
- Si quieres usar la imagen `berenjenasearch.jfif` en la app, muévela a `frontend/public/images/` y actualiza la ruta en `Buscador.js` (actualmente referencia `BerenjenaSearch-icon.png`).

Si quieres, puedo:
- Mover `berenjenasearch.jfif` a `frontend/public/images/` y actualizar `Buscador.js` automáticamente.
- Añadir instrucciones para configurar MongoDB o variables de entorno.

