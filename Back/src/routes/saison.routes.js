const express = require('express');
const router = express.Router();
const { findsaison, findsaisonMany } = require ('../controllers/saison.controller.js');

router.get("/getAll", findsaisonMany);
router.get("/get/:id", findsaison);
module.exports = router;
