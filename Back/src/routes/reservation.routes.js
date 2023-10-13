const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation } = require('../controllers/reservation.controller.js');

// Permet de récupérer toutes les reservations
router.get('/getAll', getAllReservations);
// Permet de récupérer toutes les informations de la reservation en fonction de son id
router.get('/get', getReservationById);
// Permet de créer une reservation
router.post('/create', createReservation);
// Permet de modifier une reservation
router.post('/update', updateReservation);
// Permet de supprimer une reservation
router.post('/delete', deleteReservation);


module.exports = router;