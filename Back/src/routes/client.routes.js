const express = require("express");
const router = express.Router();
const { findClients, createClient, deleteClient, updateClient, connectClient, getClientReservationById, findOneClients } = require("../controllers/client.controller.js");

router.get("/getAll", findClients)
router.get("/get", findOneClients)
router.get("/getReservation", getClientReservationById)
router.post("/create", createClient)
router.post("/delete", deleteClient)
router.post("/update", updateClient)
router.post("/connect", connectClient)


module.exports = router;