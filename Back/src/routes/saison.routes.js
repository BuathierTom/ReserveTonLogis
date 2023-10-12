const express = require('express');
const router = express.Router();
const { findSaison, findSaisonMany, updateSaison, deleteSaison, createSaison } = require ('../controllers/saison.controller.js');

// Permet de récupérer toutes les saisons
router.get("/getAll", findSaisonMany);
// Permet de récupérer une saison en fonction de son id
router.get("/get/:id", findSaison);
// Permet de créer une saison
router.post("/create", createSaison);
// Permet de modifier une saison en fonction de son id
router.post("/update/:id", updateSaison);
// Permet de supprimer une saison en fonction de son id
router.post("/delete/:id", deleteSaison);



module.exports = router;
