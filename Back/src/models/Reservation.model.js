const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    id_reservation: String,
    date_arrive: String, 
    date_depart: String,
    nb_personnes: Number,
    prix_total: Number,
});

const reservations = mongoose.model('reservations', reservationSchema);

module.exports = reservations;
