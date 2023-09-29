const mongoose = require('mongoose');
const { v4 : uuidv4 } = require ('uuid');
const crud = require('../services/db/crud')
const { getCollection } = require('../services/db/connect.js');
const Client = require('../models/client.model');

// Fonction qui recherche tous les clients
const findClients = async (req, res, next) => {
    try {
        const result = await Client.find({});
        return res.status(200).json(result)
    } catch (e){
        console.log(e)
    }

};

// Fonction qui créé un client
const createClient = async (req, res, next) => {
    try {
        // On récupere les données
        const { nom, prenom, adresse, telephone, email, password } = req.body;

        // On vérifie si l'utilisateur existe déja
        const verif = await Client.findOne({ "nom": nom })
        if (verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur ${nom} existe déja` });
        }

        const newClient = new Client({
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: password,
        });

        const clientAdd = await newClient.save();

        return res.status(200).send(clientAdd)
    } catch (e) {
        throw e;
    }
};




module.exports = {
    findClients,
    createClient,
};

