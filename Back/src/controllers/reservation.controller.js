const Reservations = require('../models/reservation.model.js');

// Fonction qui recherche toutes les reservations
const getAllReservations = async (req, res, next) => {
    try {
        const result = await Reservations.find({});
        return res.status(200).json(result)
    } catch (e){
        throw e;
    }

};

// Fonction qui créé une reservation
const createReservation = async (req, res, next) => {
    try {
        // On récupere les données
        const { id, date_arrive, date_depart, nb_personnes, prix_total } = req.body;

        // On vérifie si l'utilisateur existe déja
        const verif = await Reservations.findOne({ "id": id })
        if (verif) {
            return res.status(400).send({ Error: `Error, la reservation ${id} existe déja` });
        }

        const newReservation = new Reservations({
            id: id,
            date_arrive: date_arrive,
            date_depart: date_depart,
            nb_personnes: nb_personnes,
            prix_total: prix_total,
        });

        const reservationAdd = await newReservation.save();

        return res.status(200).send(reservationAdd)
    } catch (e) {
        throw e;
    }
};






module.exports = {
    getAllReservations,
    createReservation,
};
