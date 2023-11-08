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
    // {
    //     url: 'URL_PRODUCTION',
    //     description: 'Production server',
    //   },
  ],
};
  
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };