const express = require("express")
const app = express();
const port = 3000;
const { run } = require("./src/services/db/connect");

const clients = require("./src/routes/clients.routes");
const chambres = require("./src/routes/chambres.routes");

app.use("/clients", clients);
app.use("/chambres", chambres);


app.get("/", (req, res) => {
    res.send("Hello world !")
})

const startServer = async () => {
    run();
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}
startServer();
