const express = require("express");
const router = express.Router();
const { findClients, 
        createClient, 
        deleteClient,
        updateClient
        } = require("../controllers/clients.controller.js");

router.get("/get", findClients)
router.post("/create", createClient)
router.post("/delete", deleteClient)
router.post("/update", updateClient)


module.exports = router;