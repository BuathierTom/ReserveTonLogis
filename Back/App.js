const express = require("express")
const app = express();
const port = 3000;
const { connectToDatabase } = require("./src/services/db/connect");

const clients = require("./src/routes/clients.routes.js");
const chambres = require("./src/routes/chambres.routes.js");

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
}
startServer();
