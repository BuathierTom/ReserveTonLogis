const Client = require('../models/client.model');
const bcrypt = require('bcrypt');
const { transporter } = require('../mail/transporter.mail.js');
const fs = require('fs');
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
            //text: 'Bonjour, nous vous souhaitons la bienvenue sur notre site de réservation de logement !\n Nous sommes ravis de vous accueillir parmi nos utilisateurs. Votre compte a été créé avec succès, et vous êtes désormais prêt à explorer notre sélection exceptionnelle de logements pour votre prochain voyage. \nChez nous, vous découvrirez une variété d\'options de logement, des chambres confortables aux appartements élégants, en passant par des maisons de vacances pittoresques, afin de répondre à tous vos besoins et préférences. \nQue vous planifiiez une escapade romantique, des vacances en famille ou un voyage d\'affaires, notre plateforme conviviale vous offre la possibilité de rechercher, de comparer et de réserver facilement l\'hébergement qui correspond parfaitement à votre séjour.\n Nous sommes là pour vous accompagner tout au long de votre voyage, alors n\'hésitez pas à explorer nos offres, à poser des questions ou à demander de l\'aide à notre équipe d\'assistance dédiée. \nNous vous souhaitons un voyage inoubliable et un séjour des plus agréables dans nos logements de qualité. Merci de nous faire confiance pour votre réservation de logement. Bon voyage !'
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('E-mail envoyé au client');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail au client:', error);
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

module.exports = {
    findClients,
    createClient,
    deleteClient,
    updateClient,
    connectClient
};

