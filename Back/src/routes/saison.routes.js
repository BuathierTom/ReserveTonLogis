const express = require('express');
const router = express.Router();
const { findsaison, findsaisonMany, updateSaison, deleteSaison, createSaison } = require ('../controllers/saison.controller.js');

router.get("/getAll", findsaisonMany);
router.get("/get/:id", findsaison);
router.post("/update/:id", updateSaison);
router.post("/delete/:id", deleteSaison);
router.post("/create", createSaison);
module.exports = router;
