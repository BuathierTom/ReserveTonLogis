const express = require('express');
const router = express.Router();
const { findSaison, findSaisonMany, updateSaison, deleteSaison, createSaison } = require ('../controllers/saison.controller.js');

router.get("/getAll", findSaisonMany);
router.get("/get/:id", findSaison);
router.post("/update/:id", updateSaison);
router.post("/delete/:id", deleteSaison);
router.post("/create", createSaison);


module.exports = router;
