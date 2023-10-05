const Reservations = require('../models/reservation.model.js');
const Client = require('../models/client.model.js');
const Chambre = require('../models/chambre.model.js');

// Fonction qui recherche toutes les reservations
const getAllReservations = async (req, res, next) => {
    try {
        // on récupere les données de la reservation
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
        const { date_arrive, date_depart, nb_personnes, prix_total, id_client, id_chambre } = req.body;

        // On créé un id en fonction du dernier id de la collection
        const maxId = await Reservations.find({}).sort({id:-1}).limit(1);
        let newId;
        if (maxId.length === 0) {
            newId = 1
        } else {
            newId = maxId[0].id + 1
        }

        const newReservation = new Reservations({
            id_reservation: newId,
            date_arrive: date_arrive,
            date_depart: date_depart,
            nb_personnes: nb_personnes,
            prix_total: prix_total,
            id_client: id_client,
            id_chambre: id_chambre,
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
