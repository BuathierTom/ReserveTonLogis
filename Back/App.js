const express = require("express");
const cors = require("cors"); 

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = 5000;
const { connectToDatabase } = require("./src/services/db/connect");

const clients = require("./src/routes/client.routes.js");
const chambres = require("./src/routes/chambre.routes.js");
const reservations = require("./src/routes/reservation.routes.js");
const saison = require("./src/routes/saison.routes.js");

// SWAGGER
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation API',
    version: '1.0.0',
    description:
      `API pour un site de gestion de reservations pour 3 chambres d'hôtes chez un particulier.`,
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};
  
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};
  
const swaggerSpec = swaggerJSDoc(options);

// SWAGGER

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world !");
});

const startServer = async () => {
    connectToDatabase();
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

    app.use("/clients", clients);
    app.use("/chambres", chambres);
    app.use("/reservations", reservations);
    app.use("/saison", saison);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
startServer();
