const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation } = require('../controllers/reservation.controller.js');

router.get('/getAll', getAllReservations);
router.post('/create', createReservation);


module.exports = router;