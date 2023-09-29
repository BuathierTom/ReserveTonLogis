const mongoose = require('mongoose');
const crud = require('../services/db/crud')
const axios = require ('axios')
const { getCollection } = require('../services/db/connect.js');
const Chambre = require('../models/Chambre.model');


// Fonction qui recherche toutes les chambres
const findchambreMany = async (req, res) => {
    try {
        const getAll = await Chambre.find({});
        return res.status(200).send(getAll);
    } catch (e) {
        throw e;
    }
};

// Fonction qui recherche un item dans le registre avec un filtre sur l'id 
const findChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await Chambre.find({"id" : id})
        return res.status(200).send(getId)
    } catch (e) {
        throw e;
    }
};

// Fonction qui crée une chambre
async function addChambre(req, res, next) {
    try {
        // Vérifie si une chambre avec le même nom existe déjà dans la base de données
        const existingChambre = await crud.findOne('chambres', { nom: req.body.nom });

        if (existingChambre) {
            // Une chambre avec le même nom existe déjà, renvoie un message d'erreur
            return res.status(400).json({ error: "Une chambre avec ce nom existe déjà." });
        }

        // Si le nom de la chambre est unique, insère la nouvelle chambre
        const insertedChambre = await crud.insertOne('chambres', req.body);
        return res.status(201).json(insertedChambre);

    } catch (e) {
        console.log(`Erreur lors de l'exécution de la fonction addChambre`);
        console.log(e);
        throw e;
    }
}

// Fonction qui supprime une chambre 
async function deletechambre(req, res) {
    try {
        let nom = req.params.nom;
        let test = await crud.deleteOne('chambres', {"nom" : nom})
        return res.send(test)
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findChambre`);
        console.log(e);
        throw e;
    }
}

// Fonction qui supprime plusieurs chambres avec le même nom
async function deletechambreMany(req, res) {
    try {
        let nom = req.params.nom;
        let test = await crud.deleteMany('chambres', {"nom" : nom})
        return res.send(test)
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findChambre`);
        console.log(e);
        throw e;
    }
}

module.exports = {
    findChambre,
    addChambre,
    deletechambre,
    deletechambreMany,
    findchambreMany
};