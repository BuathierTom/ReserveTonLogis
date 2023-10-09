const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, getReservationById } = require('../controllers/reservation.controller.js');

router.get('/getAll', getAllReservations);
router.get('/get/:id', getReservationById);
router.post('/create', createReservation);


module.exports = router;