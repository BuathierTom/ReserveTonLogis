const express = require("express");
const router = express.Router();
const { findClients, 
        createClient, 
        } = require("../controllers/clients.controller.js");

// Récupérer la liste des utilisateurs
router.get("/get", findClients)

// Créé un utilisateur
// router.post("/createUser", createUser)
// // Permet d'afficher les watchlists en fonction d'un utilisateur
// router.get("/findWL", findWatchListUser)

module.exports = router;