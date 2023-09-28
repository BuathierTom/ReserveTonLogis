const express = require('express');
const router = express.Router();
const { findChambre, findchambreMany } = require ('../controllers/chambre.controller.js');

router.get("/get", findChambre);
router.get("/getAll", findchambreMany)

module.exports = router;
