const express = require("express");
const router = express.Router();
const { findClients, createClient, deleteClient, updateClient, connectClient, getClientReservationById } = require("../controllers/client.controller.js");

router.get("/get", findClients)
router.get("/getReservation/:id", getClientReservationById)
router.post("/create", createClient)
router.post("/delete/:id", deleteClient)
router.post("/update/:id", updateClient)
router.post("/connect", connectClient)


module.exports = router;