const Reservations = require('../models/reservation.model.js');
const Client = require('../models/client.model.js');
const Chambre = require('../models/chambre.model.js');

const { transporter } = require('../mail/transporter.mail.js');
const dotenv = require('dotenv');
const fs = require('fs');

const { addLog } = require("../services/logs/logs");

dotenv.config();

// Fonction qui recherche toutes les reservations
const getAllReservations = async (req, res, next) => {
    try {
        // on récupere les données de la reservation
        const result = await Reservations.find({});
        addLog("info", `getAll des reservations`, "reservation.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "reservation.controller.js");
    }

};

// Fonction qui permet de récuperer les détails d'une reservation en fonction de son id
const getReservationById = async (req, res, next) => {
    try {
        const id = req.body.id;

        // Information de la reservation
        const reservationsData = await Reservations.find({id_reservation: id});

        // Informations du client
        const idClient = reservationsData[0].id_client;
        const clientData = await Client.find({id: idClient});

        // Informations de la chambre
        const idChambre = reservationsData[0].id_chambre;
        const chambreData = await Chambre.find({id: idChambre});

        const result = {
            reservation: reservationsData,
            client: clientData,
            chambre: chambreData
        }        

        addLog("info", `getReservationById de la reservation ${id}`, "reservation.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "reservation.controller.js");
    }

};

// Fonction qui créé une reservation
const createReservation = async (req, res, next) => {
    try {
        // On récupere les données
        const { date_arrive, date_depart, nb_personnes, prix_total, id_client, id_chambre } = req.body;

        // On récupere l'email du client avec l'id_client qu'il y a dans reservation
        const clientData = await Client.find({id: id_client});
        const email = clientData[0].email;

        // On créé un id en fonction du dernier id de la collection
        const maxId = await Reservations.find({}).sort({ id_reservation: -1 }).limit(1);
        let newId;
        if (maxId.length === 0) {
            newId = 1;
        } else {
            newId = maxId[0].id_reservation + 1;
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

        // On envoie un mail de confirmation de suppression
        const emailContent = fs.readFileSync('./src/mail/createReservation.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Création de votre réservation',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de création de la réservation envoyé à ${email}`, "reservation.controller.js");
            await transporter.sendMail(mailOptions);
        } catch (error) {
            addLog("error", error, "reservation.controller.js")
        }
        addLog("info", `createReservation de la reservation ${newId}`, "reservation.controller.js");
        return res.status(200).send(reservationAdd)
    } catch (e) {
        addLog("error", e, "reservation.controller.js")
    }
};

// Fonction qui permet de modifier une reservation
const updateReservation = async (req, res, next) => {
    try {
        const id = req.body.id;
        const { date_arrive, date_depart, nb_personnes, prix_total, id_client, id_chambre } = req.body;

        // On verifie si la reservation existe
        const verif = await Reservations.findOne({id_reservation: id})
        if (!verif) {
            addLog("error", `Error, la reservation avec l'id : ${id} n'existe pas`, "reservation.controller.js");
            return res.status(404).send({Error: `Error, la reservation n'existe pas`});
        }

        const updateReservation = await Reservations.updateOne({id_reservation: id}, {
            date_arrive: date_arrive,
            date_depart: date_depart,
            nb_personnes: nb_personnes,
            prix_total: prix_total,
            id_client: id_client,
            id_chambre: id_chambre,
        });

        addLog("info", `updateReservation de la reservation ${id}`, "reservation.controller.js");
        return res.status(200).send(updateReservation)
    } catch (e) {
        addLog("error", e, "reservation.controller.js")
    }
};

// Fonction qui permet de supprimer une reservation
const deleteReservation = async (req, res, next) => {
    try {
        const id = req.body.id;

        // On verifie si la reservation existe
        const verif = await Reservations.findOne({id_reservation: id})
        if (!verif) {
            addLog("error", `Error, la reservation avec l'id : ${id} n'existe pas`, "reservation.controller.js");
            return res.status(404).send({Error: `Error, la reservation n'existe pas`});
        }

        // On récupere l'email du client avec l'id_client qu'il y a dans reservation
        const reservationsData = await Reservations.find({id_reservation: id});
        const idClient = reservationsData[0].id_client;
        const clientData = await Client.find({id: idClient});
        const email = clientData[0].email;

        const deleteReservation = await Reservations.deleteOne({id_reservation: id});

        // On envoie un mail de confirmation de suppression
        const emailContent = fs.readFileSync('./src/mail/deleteReservation.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Supression de votre réservation',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de suppression de la réservation envoyé à ${email}`, "reservation.controller.js");
            await transporter.sendMail(mailOptions);
        } catch (error) {
            addLog("error", error, "reservation.controller.js")
        }
        addLog("info", `deleteReservation de la reservation ${id}`, "reservation.controller.js");
        return res.status(200).send(deleteReservation)
    } catch (e) {
        addLog("error", e, "reservation.controller.js")
    }
};


module.exports = {
    getAllReservations,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
};