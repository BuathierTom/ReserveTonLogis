const express = require("express")
const app = express();
const port = 3000;
const { connectToDatabase } = require("./src/services/db/connect");

const clients = require("./src/routes/clients.routes.js");
const chambres = require("./src/routes/chambres.routes.js");
const reservations = require("./src/routes/reservations.routes.js");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world !")
})

const startServer = async () => {
    connectToDatabase();
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

        
    app.use("/clients", clients);
    app.use("/chambres", chambres);
    app.use("/reservations", reservations);
}
startServer();
