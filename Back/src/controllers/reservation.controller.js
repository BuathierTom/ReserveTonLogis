const Reservations = require('../models/reservation.model.js');
const Client = require('../models/client.model.js');
const Chambre = require('../models/chambre.model.js');
const jwt = require('jsonwebtoken');
const { transporter } = require('../mail/transporter.mail.js');
const dotenv = require('dotenv');
const fs = require('fs');
const { addLog } = require("../services/logs/logs.js");

dotenv.config();

/**
 * Récupere toutes les reservation créées.
 *
 * @function getAllReservations
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant toutes les reservations.
 * @throws {Error} - Si il y a une erreur lors de la récupération des reservations.
 */
const getAllReservations = async (req, res) => {
    try {
        // on récupere les données de la reservation
        const result = await Reservations.find({});
        addLog("info", `getAll des reservations`, "reservation.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "reservation.controller.js");
    }

};

/**
 * Récupere une reservation en fonction de l'id de la reservation et les informations du client et de la chambre.
 * 
 * @function getReservationById
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la reservation.
 * @throws {Error} - Si il y a une erreur lors de la récupération de la reservation.
**/
const getReservationById = async (req, res) => {
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

/**
 * Créer une reservation en récuperant les dates, le nombre de personnes, le prix total, l'id du client et l'id de la chambre.
 * Et envoie un mail de confirmation de création de la reservation.
 *   
 * @function createReservation
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la reservation créée.
 * @throws {Error} - Si il y a une erreur lors de l'envoi du mail.
 * @throws {Error} - Si il y a une erreur lors de la création de la reservation.
 * @throws {Error} - Si le client n'existe pas.
 * @throws {Error} - Si le client a deja une reservation en cours dans la meme chambre dans les memes dates.
 * @throws {Error} - Si la date d'arrivée est supérieur à la date de départ.
 */
const createReservation = async (req, res) => {
    try {
        // On récupere les données
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ Error: 'Token JWT manquant dans l\'en-tête Authorization' });
        }

        const decodedToken = jwt.verify( token.split(' ')[1], process.env.TOKEN_SECRET);

        const id_client = decodedToken.id;

        const { date_arrive, date_depart, nb_personnes, id_chambre, prix_total } = req.body;

        // On verifie que l'utilisateur n'a pas deja une réservation en cours dans la meme chambre dans les memes dates
        const verifReservation = await Reservations.find({id_client: id_client, id_chambre: id_chambre, date_arrive: date_arrive, date_depart: date_depart});
        if (verifReservation.length !== 0) {
            addLog("error", `Erreur, le client avec l'id : ${id_client} a deja une réservation en cours dans la meme chambre dans les memes dates`, "reservation.controller.js");
            return res.status(404).send({Error: `Erreur, le client a deja une réservation en cours dans la meme chambre et dans les memes dates`});
        }

        // On verifie que les dates données ne sont pas identiques
        if (date_arrive === date_depart) {
            addLog("error", `Erreur, la date d'arrivée est identique à la date de départ`, "reservation.controller.js");
            return res.status(404).send({Error: `Erreur, la date d'arrivée est identique à la date de départ`});
        }

        // On récupere toutes les dates de reservations de la chambre
        const datesData = await Reservations.find({id_chambre: id_chambre});

        // On ne recupere de chaque resultats que les dates d'arrivée et de départ
        let dateListe = [];
        for (let j = 0; j < datesData.length; j++) {
            dateListe.push({date_arrive: datesData[j].date_arrive, date_depart: datesData[j].date_depart})
        }
        
        // On prend la date d'arrivée et de départ donnée et on créé un tableau avec toutes les dates entre ces deux dates en restant avec le format YYYY-MM-DDT00:00:00.000Z
        let dateListeComplete = [];
        let dateListeEntre = [];
        let dateArrive = new Date(date_arrive);
        let dateDepart = new Date(date_depart);
        while (dateArrive < dateDepart) {
            dateListeEntre.push(new Date(dateArrive));
            dateArrive.setDate(dateArrive.getDate() + 1);
        }
        // On ajoute les dates entre la date d'arrivée et la date de départ dans le tableau dateListeComplete
        dateListeComplete.push(dateListeEntre);

        // On compare les dates du tableau dateListeComplete avec les dates du tableau dateListe
        for (let i = 0; i < dateListe.length; i++) {
            for (let j = 0; j < dateListeComplete.length; j++) {
                for (let k = 0; k < dateListeComplete[j].length; k++) {
                    if (dateListeComplete[j][k].toISOString() === dateListe[i].date_arrive.toISOString() || dateListeComplete[j][k].toISOString() === dateListe[i].date_depart.toISOString()) {
                        addLog("error", `Erreur, Une réservation existe déjà entre ces deux dates`, "reservation.controller.js");
                        return res.status(404).send({Error: `Erreur, Une réservation existe déjà entre ces deux dates`});
                    }
                }
            }
        }

        // On verifie que les dates données sont bonnes
        if (date_arrive > date_depart) {
            addLog("error", `Erreur, la date d'arrivée est supérieur à la date de départ`, "reservation.controller.js");
            return res.status(404).send({Error: `Erreur, la date d'arrivée est supérieur à la date de départ`});
        }

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
            id_client: id_client,
            id_chambre: id_chambre,
            prix_total: prix_total,
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

/**
 * Met à jour une reservation en récuperant les dates, le nombre de personnes, le prix total, l'id du client et l'id de la chambre.
 * 
 * @function updateReservation
 * @param {Object} req - L'objet de requête.   
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la reservation mise à jour.
 * @throws {Error} - Si la reservation n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la mise à jour de la reservation.
 */
const updateReservation = async (req, res) => {
    try {
        const id = req.body.id;
        const { date_arrive, date_depart, nb_personnes, prix_total, id_client, id_chambre } = req.body;

        // On verifie si la reservation existe
        const verif = await Reservations.findOne({id_reservation: id})
        if (!verif) {
            addLog("error", `Erreur, la reservation avec l'id : ${id} n'existe pas`, "reservation.controller.js");
            return res.status(404).send({Error: `Erreur, la reservation n'existe pas`});
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

/**
 * Supprime une reservation en fonction de l'id de la reservation, et envoie un mail de confirmation de 
 * suppression de la reservation au client.
 * 
 * @function deleteReservation
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la reservation supprimée.
 * @throws {Error} - Si il y a une erreur lors de l'envoi du mail.
 * @throws {Error} - Si la reservation n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la suppression de la reservation.
 */
const deleteReservation = async (req, res) => {
    try {
        const id = req.body.id;

        // On verifie si la reservation existe
        const verif = await Reservations.findOne({id_reservation: id})
        if (!verif) {
            addLog("error", `Erreur, la reservation avec l'id : ${id} n'existe pas`, "reservation.controller.js");
            return res.status(404).send({Error: `Erreur, la reservation n'existe pas`});
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

/**
 * Récupere toutes les dates de reservations en fonction de l'id de la chambre.
 * 
 * @function findDatesForChambres
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant toutes les dates de reservations.
 * @throws {Error} - Si il y a une erreur lors de la récupération des dates de reservations.
 */
const findDatesForChambres = async (req, res) => {
    try {
        const id_chambre = req.params.id;
        
        const reservationsData = await Reservations.find({id_chambre: id_chambre});

        // On ne recupere de chaque resultats que les dates d'arrivée et de départ
        let result = [];
        for (let j = 0; j < reservationsData.length; j++) {
            result.push({date_arrive: reservationsData[j].date_arrive, date_depart: reservationsData[j].date_depart})
        }        

        addLog("info", `findDatesForChambres de toutes les dates de reservations`, "reservation.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "reservation.controller.js");
    }
};


module.exports = {
    getAllReservations,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    findDatesForChambres,
};