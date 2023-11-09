const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Documentation API',
    version: '1.0.0',
    description: `API pour un site de gestion de reservations pour 3 chambres d'hôtes chez un particulier.`,
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/client.routes.js', './src/routes/chambre.routes.js', './src/routes/reservation.routes.js', './src/routes/saison.routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);