const Client = require('../models/client.model');
const Reservations = require('../models/reservation.model');
const Chambre = require('../models/chambre.model');
const fs = require('fs');
const bcrypt  = require('bcrypt');
const { transporter } = require('../mail/transporter.mail.js');
const dotenv = require('dotenv');

dotenv.config();

// Fonction qui recherche tous les clients
const findClients = async (req, res, next) => {
    try {
        const result = await Client.find({});
        return res.status(200).json(result)
    } catch (e){
        throw e;
    }

};


const createClient = async (req, res, next) => {
    try {
        // On récupère les données
        const { nom, prenom, adresse, telephone, email, password } = req.body;

        // On vérifie si l'utilisateur avec l'e-mail existe déjà
        const verif = await Client.findOne({ "email": email });
        if (verif) {
            return res.status(400).send({ Error: `Erreur, l'utilisateur avec l'e-mail : ${email} existe déjà` });
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
        const emailContent = fs.readFileSync('./src/mail/mailText.mail.html', 'utf-8');
        //Envoi de l'e-mail au client
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Bienvenue chez RéserveTonLogis.com !',
            html: emailContent,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }

        return res.status(200).send(clientAdd);
    } catch (e) {
        throw e;
    }
};


// Fonction qui delete un client
const deleteClient = async (req, res, next) => {
    try {
        const { email } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas` });
        }

        const deleteClient = await Client.deleteOne({ "email": email })
        return res.status(200).send(deleteClient)
    } catch (e) {
        throw e;
    }
};

// Fonction qui update un client
const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse, telephone, email, password } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "id": id })
        if (!verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur avec l'id : ${id} n'existe pas` });
        }

        const updateClient = await Client.updateOne({ "id": id }, {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: password,
        })
        return res.status(200).send(updateClient)
    } catch (e) {
        throw e;
    }
};

// Fonction de connexion par mail et mot de passe 
const connectClient = async (req, res, next) => {
    const { email, password } = req.body;
    // On verifie si l'utilisateur existe
    const verif = await Client.findOne({ "email": email })
    if (!verif) {
        return res.status(400).send({ Error: `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas` });
    }

    // On verifie si le mot de passe est correct
    const verifPassword = await bcrypt.compare(password, verif.password);
    if (!verifPassword) {
        return res.status(400).send({ Error: `Error, le mot de passe est incorrect` });
    }
    //console.log("client connecté")
    return res.status(200).send(verif)
    
};

// Fonction qui permet de récuperer les détails d'une reservation en fonction de l'id du
const getClientReservationById = async (req, res, next) => {
    try {
        const { id } = req.params.id;

        // Information de la reservation
        const reservationData = await Reservations.find({id_client: id});

        // Information de la chambre
        const chambreData = await Chambre.find({id: reservationData.id_chambre});

        const result = {
            reservation: reservationData,
            chambre: chambreData
        }

        return res.status(200).json(result)
    } catch (e){
        throw e;
    }

};

module.exports = {
    findClients,
    createClient,
    deleteClient,
    updateClient,
    connectClient,
    getClientReservationById
};

