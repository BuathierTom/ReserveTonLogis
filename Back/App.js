const express = require("express");
const cors = require("cors"); 

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = 5000;
const { connectToDatabase } = require("./src/services/db/connect.js");

const clients = require("./src/routes/client.routes.js");
const chambres = require("./src/routes/chambre.routes.js");
const reservations = require("./src/routes/reservation.routes.js");
const saison = require("./src/routes/saison.routes.js");
// const tokenroute = require('./src/routes/token.routes'); 

const { swaggerUi, swaggerSpec } = require('./src/services/swagger/config-swagger.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world !");
});

// app.use('/token', tokenroute); 
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
