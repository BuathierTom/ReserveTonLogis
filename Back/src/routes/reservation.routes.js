const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation } = require('../controllers/reservation.controller.js');

router.get('/getAll', getAllReservations);
router.get('/get', getReservationById);
router.post('/create', createReservation);
router.post('/update', updateReservation);
router.post('/delete', deleteReservation);


module.exports = router;