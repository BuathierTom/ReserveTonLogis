const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation } = require('../controllers/reservation.controller.js');

router.get('/getAll', getAllReservations);
router.get('/get/:id', getReservationById);
router.post('/create', createReservation);
router.post('/update/:id', updateReservation);
router.post('/delete/:id', deleteReservation);


module.exports = router;