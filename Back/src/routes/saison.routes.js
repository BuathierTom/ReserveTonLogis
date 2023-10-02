const express = require('express');
const router = express.Router();
const { findsaison, findsaisonMany, updateChambre, deleteChambre } = require ('../controllers/saison.controller.js');

router.get("/getAll", findsaisonMany);
router.get("/get/:id", findsaison);
router.post("/update/:id", updateChambre);
router.post("/delete/:id", deleteChambre);

module.exports = router;
