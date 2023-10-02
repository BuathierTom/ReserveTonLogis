const express = require('express');
const router = express.Router();
const { getAllReservations, } = require('../controllers/reservation.controller.js');

router.get('/getAll', getAllReservations);


module.exports = router;