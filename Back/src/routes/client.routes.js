const express = require("express");
const router = express.Router();
const { findClients, createClient, deleteClient, updateClient, connectClient, getClientReservationById, findOneClients } = require("../controllers/client.controller.js");

// Permet de récupérer tous les clients
router.get("/getAll", findClients)
// Permet de récupérer un client en fonction de son id
router.get("/get", findOneClients)
// Permet de récupérer une reservation en fonction de l'id du client
router.get("/getReservation", getClientReservationById)
// Permet de créer un client
router.post("/create", createClient)
// Permet de supprimer un client
router.post("/delete", deleteClient)
// Permet de modifier un client
router.post("/update", updateClient)
// Permet de connecter un client
router.post("/connect", connectClient)


module.exports = router;