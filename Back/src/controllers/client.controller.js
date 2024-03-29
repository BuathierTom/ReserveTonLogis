const Client = require('../models/client.model');
const Reservations = require('../models/reservation.model');
const Chambre = require('../models/chambre.model');
const fs = require('fs');
const bcrypt  = require('bcrypt');
const { transporter } = require('../mail/transporter.mail.js');
const { addLog } = require("../services/logs/logs");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const jwtUtils = require ('../utils/jwtUtils.js')

const crypto = require("crypto-js")
const ejs = require('ejs');


dotenv.config();
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
        // Decrypter adresse
        const decryptAdresse = crypto.AES.decrypt(client.adresse, process.env.CRYPTO_SECRET);
        client.adresse = decryptAdresse.toString(crypto.enc.Utf8);

        // Decrypter ville
        const decryptVille = crypto.AES.decrypt(client.ville, process.env.CRYPTO_SECRET);
        client.ville = decryptVille.toString(crypto.enc.Utf8);

        // Decrypter code postal
        const decryptCodePostal = crypto.AES.decrypt(client.codePostal, process.env.CRYPTO_SECRET);
        client.codePostal = decryptCodePostal.toString(crypto.enc.Utf8);

        // Decrypter telephone
        const decryptTelephone = crypto.AES.decrypt(client.telephone, process.env.CRYPTO_SECRET);
        client.telephone = decryptTelephone.toString(crypto.enc.Utf8);

        // Decrypter nom
        const decryptNom = crypto.AES.decrypt(client.nom, process.env.CRYPTO_SECRET);
        client.nom = decryptNom.toString(crypto.enc.Utf8);

        // Decrypter prenom
        const decryptPrenom = crypto.AES.decrypt(client.prenom, process.env.CRYPTO_SECRET);
        client.prenom = decryptPrenom.toString(crypto.enc.Utf8);

        
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
const createClient = async (req, res) => {
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
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crypter l'adresse
        const encryptedAdresse = crypto.AES.encrypt(adresse, process.env.CRYPTO_SECRET);
        // Crypter la ville
        const encryptedVille = crypto.AES.encrypt(ville, process.env.CRYPTO_SECRET);
        // Crypter le code postal
        const encryptedCodePostal = crypto.AES.encrypt(codePostal, process.env.CRYPTO_SECRET);
        // Crypter le téléphone
        const encryptedTelephone = crypto.AES.encrypt(telephone, process.env.CRYPTO_SECRET);
        // Crypter le nom
        const encryptedNom = crypto.AES.encrypt(nom, process.env.CRYPTO_SECRET);
        // Crypter le prénom
        const encryptedPrenom = crypto.AES.encrypt(prenom, process.env.CRYPTO_SECRET);
        
        const newClient = new Client({
            id: newId,
            nom: encryptedNom,
            prenom: encryptedPrenom,
            adresse: encryptedAdresse,
            telephone: encryptedTelephone,
            ville: encryptedVille,
            codePostal: encryptedCodePostal,
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
        return res.status(200).json({ client: clientAdd });
  } catch (e) {
    console.error(e);
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
const deleteClient = async (req, res) => {
    try {
        // on recupere le jsonwebtoken du client    
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ Error: 'Token JWT manquant dans l\'en-tête Authorization' });
        }

        // On verifie si l'utilisateur existe
        const decodedToken = jwt.verify( token.split(' ')[1], process.env.TOKEN_SECRET);
        const id = decodedToken.id;

        // On récuperer les réservation de ce client et on supprime les réservations
        const reservationData = await Reservations.find({ id_client: id });
        for (let i = 0; i < reservationData.length; i++) {
            const idReservation = reservationData[i].id_reservation;
            const deleteReservation = await Reservations.deleteOne({ "id_reservation": idReservation })
        }

        const clientData = await Client.findOne({ id: id });

        const email = clientData.email;

        const deleteClient = await Client.deleteOne({ "email": email })

        // On envoie un mail de confirmation de suppression
        const emailContent = fs.readFileSync('./src/mail/deleteClient.html', 'utf-8');
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
const updateClient = async (req, res) => {
    try {
        const { nom, prenom, adresse, telephone, ville, codePostal, email, password } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Erreur, l'utilisateur avec l'id : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, l'utilisateur n'existe pas` });
        }
        
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crypter l'adresse
        const encryptedAdresse = crypto.AES.encrypt(adresse, process.env.CRYPTO_SECRET);
        // Crypter la ville
        const encryptedVille = crypto.AES.encrypt(ville, process.env.CRYPTO_SECRET);
        // Crypter le code postal
        const encryptedCodePostal = crypto.AES.encrypt(codePostal, process.env.CRYPTO_SECRET);
        // Crypter le téléphone
        const encryptedTelephone = crypto.AES.encrypt(telephone, process.env.CRYPTO_SECRET);
        // Crypter le nom
        const encryptedNom = crypto.AES.encrypt(nom, process.env.CRYPTO_SECRET);
        // Crypter le prénom
        const encryptedPrenom = crypto.AES.encrypt(prenom, process.env.CRYPTO_SECRET);

        const updateClient = await Client.updateOne({ "email": email }, {
            nom: encryptedNom,
            prenom: encryptedPrenom,
            adresse: encryptedAdresse,
            telephone: encryptedTelephone,
            ville: encryptedVille,
            codePostal: encryptedCodePostal,
            email: email,
            password: hashedPassword,
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
const connectClient = async (req, res) => {
    try {
        const { email, password } = req.body;
        // On vérifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Erreur, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, l'utilisateur n'existe pas` });
        }

        // On vérifie si le mot de passe est correct
        const verifPassword = await bcrypt.compare(password, verif.password);
        if (!verifPassword) {
            addLog("error", `Erreur, le mot de passe est incorrect`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, le mot de passe est incorrect` });
        }
        // On génère un token
        const token = jwtUtils.generateAccessToken(verif.id);
        // Renvoi du token généré lors de l'inscription au client.
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
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ Error: 'Token JWT manquant dans l\'en-tête Authorization' });
        }
        // console.log(token);

        const decodedToken = jwt.verify( token.split(' ')[1], process.env.TOKEN_SECRET);

        const idClient = decodedToken.id;
        

        // Information de la reservation
        const reservationData = await Reservations.find({ id_client: idClient });

        if (!reservationData || reservationData.length === 0) {
            return res.status(404).json({ message: 'Aucune réservation trouvée pour ce client.' });
        }


        // Information de la chambre en fonction de reservationData
        const idChambres = reservationData.map((reservation) => reservation.id_chambre);

        // Récupérez les chambres en fonction des id_chambre
        const chambreData = await Chambre.find({ id: { $in: idChambres } });
    
        // Créez un tableau avec les informations essentielles pour chaque réservation
        const reservationsAvecChambresSimplifiees = reservationData.map((reservation) => {
        const chambreAssociee = chambreData.find((chambre) => chambre.id === reservation.id_chambre);
          return {
            id_reservation: reservation.id_reservation,
            date_arrive: reservation.date_arrive,
            date_depart: reservation.date_depart,
            nb_personnes: reservation.nb_personnes,
            prix_total: reservation.prix_total,
            chambre: {
              nom: chambreAssociee.nom,
              description: chambreAssociee.description,
              prix: chambreAssociee.prix,
              superficie: chambreAssociee.superficie,
              image: chambreAssociee.image1,

            },
          };
        });

        // Envoyez les données simplifiées à votre application React
        return res.status(200).json({ reservationsAvecChambres: reservationsAvecChambresSimplifiees });
      } catch (e) {
        addLog("error", e, "client.controller.js");
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
      }
};

/**
 * Met à jour le mot de passe d'un client en fonction de son email et de son mot de passe.
 * 
 * @function updatePassword
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant le client.
 * @throws {Error} - Si il y a une erreur lors de la mise à jour du mot de passe du client.
 * @throws {Error} - Si le client n'existe pas.
 * @throws {Error} - Si le mot de passe est incorrect.
 * @throws {Error} - Si le mot de passe est identique à l'ancien.
 */
const updatePassword = async (req, res) => {
    try {
        // Fonction pour update le mot de passe
        const { email, password, newPassword } = req.body;
    
        // On vérifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            addLog("error", `Erreur, l'utilisateur avec l'adresse mail : ${email} n'existe pas`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, l'utilisateur n'existe pas` });
        }
        
        if (password !=verif.password) {
            addLog("error", `Erreur, le mot de passe est incorrect`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, le mot de passe est incorrect` });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 

        if (await bcrypt.compare(newPassword, verif.password)) {
            addLog("error", `Erreur, le nouveau mot de passe est identique à l'ancien`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, le nouveau mot de passe est identique à l'ancien` });
        }

        const updateClient = await Client.updateOne({ "email": email }, {
            password: hashedPassword,
        })

        // On envoie un mail de confirmation de modification de mot de passe
        const emailContent = fs.readFileSync('./src/mail/updatePasswordClient.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptionsClient = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Confirmation de modification du mot de passe',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de modification du mot de passe du compte envoyé à ${email}`, "client.controller.js");
            await transporter.sendMail(mailOptionsClient);
        } catch (error) {
            addLog("error", error, "client.controller.js");
        }

        addLog("info", `updatePassword du client ${email}`, "client.controller.js");
        return res.status(200).send(updateClient)

    } catch (e){
        addLog("error", e, "client.controller.js");
    }
};

/**
 * Envoi un mail de contact au client grace au formulaire de contact.
 * 
 * @function clientContact
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un message disant que le mail est bien envoyé.
 * @throws {Error} - Si il y a une erreur lors de l'envoi du mail de contact.
 * @throws {Error} - Si un ou plusieurs champs sont vides.
 */
const clientContact = async (req, res) => {
    try{
        const { nom, prenom, email, message } = req.body;

        // On verifie que les champs ne sont pas vide
        if (!nom || !prenom || !email || !message) {
            addLog("error", `Erreur, un ou plusieurs champs sont vides`, "client.controller.js");
            return res.status(404).send({ Error: `Erreur, un ou plusieurs champs sont vides` });
        }

        // On ajoute dans le message l'email du client
        const messageClient = message + " <br> Email du client : " + email;

        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'Message de ' + nom + ' ' + prenom + ' via le formulaire de contact',
            html: messageClient,
        };

        try {
            addLog("info", `Mail de contact envoyé par le client :${email}`, "client.controller.js");
            await transporter.sendMail(mailOptions);

        } catch (error) {
            addLog("error", error, "client.controller.js");
        }

        // On envoie un mail de confirmation de contact
        const emailContent = fs.readFileSync('./src/mail/contactClient.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptionsClient = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Confirmation de contact',
            html: emailContent,
        };

        try {
            addLog("info", `Mail de confirmation de suppression du compte envoyé à ${email}`, "client.controller.js");
            await transporter.sendMail(mailOptionsClient);
        } catch (error) {
            addLog("error", error, "client.controller.js");
        }

        addLog("info", `clientContact du client : ${email}`, "client.controller.js");
        return res.status(200).send("Mail envoyé");
    } catch(e) {
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
    findOneClients,
    updatePassword,
    clientContact,
};