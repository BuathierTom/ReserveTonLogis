const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    id_reservation: Number,
    date_arrive: String, 
    date_depart: String,
    nb_personnes: Number,
    prix_total: Number,
    id_client: Number,
    id_chambre: Number,
});

const Reservations = mongoose.model('reservations', reservationSchema);

module.exports = Reservations;
