const express = require("express");
const router = express.Router();
const { findClients, createClient, deleteClient, updateClient, connectClient, getClientReservationById, findOneClients, updatePassword, clientContact } = require("../controllers/client.controller.js");

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
// Permet de modifier le mot de passe d'un client
router.post("/updatePassword", updatePassword);
// Permet d'envoyer un mail grace au formulaire de contact
router.post("/clientContact", clientContact);



module.exports = router;