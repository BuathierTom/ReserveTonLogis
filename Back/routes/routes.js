const express = require('express');
const router = express.Router();
const {createClient, findClient, findClientmany, updateClient } = require ('../controllers/Client.js');



router.post("/create", createClient);
router.get("/create/findone/:nom", findClient);
router.get("/create/find/", findClientmany);
router.post("/create/update/:nom", updateClient);
// --------------------------------------------

module.exports = router;