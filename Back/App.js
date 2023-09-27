const express = require("express")
const app = express();
const port = 3000;
const { run } = require("./src/services/db/connect");

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