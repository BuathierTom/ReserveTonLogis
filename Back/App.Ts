import express from "express";
import { connectToDatabase } from './src/config'
import useRouter from './src/routes/index'

const app = express();
const port = 5000;

// Appelez ça dans tout vos fichiers pour accéder à l'instance de la BDD
// const { db } = require("./services/connect.js");

app.get("/", (req, res) => {
    res.send("Hello World")

});

connectToDatabase();

const startServer = async () => {
  app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
  });
  app.use(useRouter);
}
startServer();


