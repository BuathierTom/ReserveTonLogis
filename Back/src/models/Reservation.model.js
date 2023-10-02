const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    id: String,
    date_arrive: String, 
    date_depart: String,
    nb_personnes: Number,
    prix_total: Number,
});

const Reservations = mongoose.model('reservations', reservationSchema);

module.exports = Reservations;
