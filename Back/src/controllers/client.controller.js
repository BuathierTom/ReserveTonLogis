const Client = require('../models/client.model');
const Reservations = require('../models/reservation.model');
const Chambre = require('../models/chambre.model');
const fs = require('fs');
const bcrypt  = require('bcrypt');
const { transporter } = require('../mail/transporter.mail.js');
const { addLog } = require("../services/logs/logs");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


dotenv.config();

const generateAccessToken = (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });

    if (!token) {
        addLog("error", `Erreur, le token n'a pas pu être généré`, "client.controller.js");
        return res.status(404).send({ Error: `Erreur, le token n'a pas pu être généré` });
    }
    console.log(token); // Ajoutez cette ligne pour déboguer
    return token;
};


/**
 * Récupere tous les clients de la base.
 * 
 * @function findClients
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant tous les clients.
 * @throws {Error} - Si il y a une erreur lors de la récupération des clients.
 */
const findClients = async (req, res) => {
    try {
        const result = await Client.find({});
        addLog("info", `getAll des clients`, "client.controller.js");
        return res.status(200).json(result)
    } catch (e){
        addLog("error", e, "client.controller.js");
    }

};

/**
 * Récupere un client en fonction de son id.
 * 
 * @function findOneClients
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant le client.
 * @throws {Error} - Si il y a une erreur lors de la récupération du client.
 * @throws {Error} - Si le token JWT est manquant dans l'en-tête Authorization.
 */
const findOneClients = async (req, res) => {
    console.log('La fonction findOneClients a été appelée');
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ Error: 'Token JWT manquant dans l\'en-tête Authorization' });
        }

        const decodedToken = jwt.verify( token.split(' ')[1], process.env.TOKEN_SECRET);

        const id = decodedToken.id;
        const client = await Client.findOne({ id: id });
        
        if (!client) {
            return res.status(404).send({ Error: `Aucun client trouvé avec l'ID : ${id}` });
        }
        
        return res.status(200).json(client);
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};

/**
 * Créer un client en fonction des données envoyées.
 * Envoi un mail de confirmation de création.
 * 
 * @function createClient
 * @param {Object} req - L'objet de requête.$
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant le client.
 * @throws {Error} - Si il y a une erreur lors de la création du client.
 * @throws {Error} - Si le client existe déjà.
 * @throws {Error} - Si il y a une erreur lors de l'envoi du mail de confirmation de création.
 */
const createClient = async (req, res, next) => {
    try {
        // On récupère les données
        const { nom, prenom, adresse, telephone, ville, codePostal, email, password } = req.body;
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
            ville: ville,
            codePostal: codePostal,
            email: email,
            password: hashedPassword,
        });

        const clientAdd = await newClient.save();
        const emailContent = fs.readFileSync('./src/mail/createClient.mail.html', 'utf-8');
        const token = generateAccessToken(verif.id);
        console.log(token); // Assurez-vous que cela renvoie un token valide ici        
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

/**
 * Supprime un client en fonction de son id.
 * Envoi un mail de confirmation de suppression.
 * 
 * @function deleteClient
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant le client supprimé.
 * @throws {Error} - Si il y a une erreur lors de la suppression du client.
 * @throws {Error} - Si le client n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la suppression des réservations du client.
 * @throws {Error} - Si il y a une erreur lors de l'envoi du mail de confirmation de suppression.
 * @throws {Error} - Si le token JWT est manquant dans l'en-tête Authorization.
 */
const deleteClient = async (req, res, next) => {
    try {
        // on recupere le jsonwebtoken du client
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ Error: 'Token JWT manquant dans l\'en-tête Authorization' });
        }

        // On verifie si l'utilisateur existe
        const decodedToken = jwt.verify( token.split(' ')[1], process.env.TOKEN_SECRET);
        const id = decodedToken.id;
        console.log(id);

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
/**
 * Met à jour un client en fonction de son id.
 * 
 * @function updateClient
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant le client.
 * @throws {Error} - Si il y a une erreur lors de la mise à jour du client.
 * @throws {Error} - Si le client n'existe pas.
 */
const updateClient = async (req, res, next) => {
    try {
        const { id, nom, prenom, adresse, telephone, ville, codePostal, email, password } = req.body;
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
            ville: ville,
            codePostal: codePostal,
            email: email,
            password: password,
        })

        addLog("info", `updateClient du client ${email}`, "client.controller.js");
        return res.status(200).send(updateClient)
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};

/**
 * Connecte un client en fonction de son email et de son mot de passe.
 * 
 * @function connectClient
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant l'id du client.
 * @throws {Error} - Si il y a une erreur lors de la connexion du client.
 * @throws {Error} - Si le client n'existe pas.
 * @throws {Error} - Si le mot de passe est incorrect.
*/
const connectClient = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // On vérifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });
        }

        // On vérifie si le mot de passe est correct
        const verifPassword = await bcrypt.compare(password, verif.password);
        if (!verifPassword) {
            addLog("error", `Error, le mot de passe est incorrect`, "client.controller.js");
            return res.status(404).send({ Error: `Error, le mot de passe est incorrect` });
        }
        // On génère un token
        const token = generateAccessToken(verif.id);
        console.log(token); // Assurez-vous que cela renvoie un token valide ici
        // Vous pouvez maintenant renvoyer le token au client
        return res.status(200).json({ token: token });
    } catch (e) {
        addLog("error", e, "client.controller.js");
    }
};


/**
 * Récupere les réservations d'un client en fonction de son id.
 * 
 * @function getClientReservationById
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant les réservations du client.
 * @throws {Error} - Si il y a une erreur lors de la récupération des réservations du client.
 * @throws {Error} - Si le client n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la récupération des chambres.
 */
const getClientReservationById = async (req, res) => {
    try {
        const idClient = await req.headers.authorization.replace('Bearer ', ''); // Récupérer l'ID du client depuis l'en-tête
        console.log('ID du client', idClient);

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

const updatePassword = async (req, res) => {
    try {
        // Fonction pour update le mot de passe
        const { email, password } = req.body;

        // On vérifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });
        }

        // On vérifie si le mot de passe est correct
        const verifPassword = await bcrypt.compare(password, verif.password);
        if (!verifPassword) {
            addLog("error", `Error, le mot de passe est incorrect`, "client.controller.js");
            return res.status(404).send({ Error: `Error, le mot de passe est incorrect` });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de salages

        const updateClient = await Client.updateOne({ "email": email }, {
            password: hashedPassword,
        })

        addLog("info", `updatePassword du client ${email}`, "client.controller.js");
        return res.status(200).send(updateClient)

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
    findOneClients,
    updatePassword
};

