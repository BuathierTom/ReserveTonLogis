const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation, findDatesForChambres } = require('../controllers/reservation.controller.js');

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
// Permet de récupérer les dates de réservation en fonction de l'ID de la chambre
router.get('/getDatesReservations/:id', findDatesForChambres);

module.exports = router;