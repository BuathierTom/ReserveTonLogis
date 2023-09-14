const express = require("express")
const pgp = require('pg-promise')();
const app = express();
const port = 3000;
const { db } = require("./services/connect.js");
const { json } = require("body-parser");

// Appelez ça dans tout vos fichiers pour accéder à l'instance de la BDD
// const { db } = require("./services/connect.js");

app.get("/", (req, res) => {
    res.send("Hello World")

});

const startServer = async () => {
  app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
  });

  // const query = pgp.as.format('SELECT * FROM clients WHERE id_client = 1')
  // const response = await db.any(query)
  // console.log(response)
}
startServer();
