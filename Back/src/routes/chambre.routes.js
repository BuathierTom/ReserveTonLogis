const express = require('express');
const router = express.Router();
const { findChambre, findchambreMany, updateChambre, deleteChambre } = require ('../controllers/chambre.controller.js');

router.get("/getAll", findchambreMany);
router.get("/get/:id", findChambre);
router.post("/update/:id", updateChambre);
router.post("/delete/:id", deleteChambre);

module.exports = router;
