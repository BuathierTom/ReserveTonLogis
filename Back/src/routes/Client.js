const express = require('express');
const router = express.Router();
const { getclient } = require('../controllers/Client.js');

router.get("/get", getclient);

module.exports = router;
