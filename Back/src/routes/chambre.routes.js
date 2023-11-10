const express = require('express');
const router = express.Router();
const { findChambre, findchambreMany, updateChambre, deleteChambre } = require ('../controllers/Chambre.controller.js');

// Permet de récupérer toutes les chambres
router.get("/getAll", findchambreMany);
// Permet de récupérer une chambre en fonction de son id
router.get("/get/:id", findChambre);

// --------------------------------------
// Permet de modifier une chambre
router.post("/update/:id", updateChambre);
// Permet de supprimer une chambre
router.post("/delete/:id", deleteChambre);

module.exports = router;
