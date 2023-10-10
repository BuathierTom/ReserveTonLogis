const Client = require('../models/client.model');
const Reservations = require('../models/reservation.model');
const Chambre = require('../models/chambre.model');
const fs = require('fs');
const bcrypt  = require('bcrypt');
const { transporter } = require('../mail/transporter.mail.js');
const { addLog } = require("../services/logs/logs");
const dotenv = require('dotenv');

dotenv.config();

// Fonction qui recherche tous les clients
const findClients = async (req, res, next) => {
    try {
        const result = await Client.find({});
        addLog("info", `getAll des clients`, "client.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "client.controller.js");
    }

};

// Fonction qui recherche un client dans le registre avec un filtre sur l'id 
const findOneClients = async (req, res) => {
    try {
        const id = req.body.id;
        const getId = await Client.find({id : id})
        addLog("info", `getId du client ${id}`, "client.controller.js");
        return res.status(200).send(getId)
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};

const createClient = async (req, res, next) => {
    try {
        // On récupère les données
        const { nom, prenom, adresse, telephone, email, password } = req.body;

        // On vérifie si l'utilisateur avec l'e-mail existe déjà
        const verif = await Client.findOne({ "email": email });
        if (verif) {
            addLog("error", `Erreur, l'utilisateur avec l'e-mail : ${email} existe déjà`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, l'utilisateur existe déjà` });
        }

        // On récupère l'id max (si il n'y en a pas, on met 1) de la collection Client et on ajoute 1 à l'id
        const maxId = await Client.find({}).sort({ id: -1 }).limit(1);
        let newId;
        if (maxId.length === 0) {
            newId = 1;
        } else {
            newId = maxId[0].id + 1;
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de salages

        const newClient = new Client({
            id: newId,
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: hashedPassword,
        });

        const clientAdd = await newClient.save();
        const emailContent = fs.readFileSync('./src/mail/createClient.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Bienvenue chez RéserveTonLogis.com !',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de création du compte envoyé à ${email}`, "client.controller.js");
            await transporter.sendMail(mailOptions);
        } catch (error) {
            addLog("error", error, "client.controller.js");
        }
        addLog("info", `createClient du client ${email}`, "client.controller.js");
        return res.status(200).send(clientAdd);
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};


// Fonction qui delete un client
const deleteClient = async (req, res, next) => {
    try {
        const id = req.body.id;

        // On récupere l'email du client avec l'id_client qu'il y a dans client
        const clientData = await Client.find({ id: id });
        const email = clientData[0].email;

        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });
        }

        // On récuperer les réservation de ce client et on supprime les réservations
        const reservationData = await Reservations.find({ id_client: id });
        for (let i = 0; i < reservationData.length; i++) {
            const idReservation = reservationData[i].id_reservation;
            const deleteReservation = await Reservations.deleteOne({ "id_reservation": idReservation })
        }

        const deleteClient = await Client.deleteOne({ "email": email })

        // On envoie un mail de confirmation de suppression
        const emailContent = fs.readFileSync('./src/mail/deleteClient.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Suppression de votre compte',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de suppression du compte envoyé à ${email}`, "client.controller.js");
            await transporter.sendMail(mailOptions);
        } catch (error) {
            addLog("error", error, "client.controller.js");
        }

        addLog("info", `deleteClient du client ${email}`, "client.controller.js");
        return res.status(200).send(deleteClient)
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};

// Fonction qui update un client
const updateClient = async (req, res, next) => {
    try {
        const { id, nom, prenom, adresse, telephone, email, password } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Error, l'utilisateur avec l'id : ${id} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });
        }

        const updateClient = await Client.updateOne({ "id": id }, {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: password,
        })

        addLog("info", `updateClient du client ${email}`, "client.controller.js");
        return res.status(200).send(updateClient)
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};

const connectClient = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });
        }

        // On verifie si le mot de passe est correct
        const verifPassword = await bcrypt.compare(password, verif.password);
        if (!verifPassword) {
            addLog("error", `Error, le mot de passe est incorrect`, "client.controller.js");
            return res.status(404).send({ Error: `Error, le mot de passe est incorrect` });
        }

        // Si l'authentification réussit, renvoyez l'ID du client sous la clé "id"
        addLog("info", `connectClient du client ${email}`, "client.controller.js");
        return res.status(200).send({ id: verif.id });
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};


// Fonction qui permet de récuperer les détails d'une reservation en fonction de l'id du
const getClientReservationById = async (req, res, next) => {
    try {
        const idClient = req.body.id;

        // Information de la reservation
        const reservationData = await Reservations.find({id_client: idClient});

        let result = [];
        for (let i = 0; i < reservationData.length; i++) {
            const idChambre = reservationData[i].id_chambre;
            const chambreData = await Chambre.find({id: idChambre});
            result.push({
                reservation: reservationData[i],
                chambre: chambreData
            })
        }

        addLog("info", `getClientReservationById du client ${idClient}`, "client.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "client.controller.js");
    }

};

module.exports = {
    findClients,
    createClient,
    deleteClient,
    updateClient,
    connectClient,
    getClientReservationById,
    findOneClients
};

