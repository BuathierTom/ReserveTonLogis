const mongoose = require('mongoose');
const crud = require('../services/db/crud')
const axios = require ('axios')
const { getCollection } = require('../services/db/connect.js');
const Saisons = require('../models/saison.model');


// Fonction qui recherche toutes les saisons
const findsaisonMany = async (req, res) => {
    try {
        const getAll = await Saisons.find({});
        return res.status(200).send(getAll);
    } catch (e) {
        throw e;
    }
};

// Fonction qui recherche une saison dans le registre avec un filtre sur l'id 
const findsaison = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await Saisons.find({"id" : id})
        return res.status(200).send(getId)
    } catch (e) {
        throw e;
    }
};

// Fonction qui update une saison
const updateSaison = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, promotion} = req.body;
        const verif = await Saisons.findOne({ "id": id })
        if (!verif) {
            return res.status(400).send({ Error: `Error, la saison ${id} n'existe pas` });
        }
        const saisonupdate = await Saisons.updateOne({ "id": id }, {
            nom: nom,
            promotion: promotion,
        })
        return res.status(200).send(saisonupdate)
    } catch (e) {
        throw e;
    }
};

// Delete saison
const deleteSaison = async (req, res) => {
    try {
        const id = req.params.id;
        const verif = await Saisons.findOne({ "id": id })
        if (!verif) {
            return res.status(400).send({ Error: `Error, la saison ${id} n'existe pas` });
        }

        const deletesaison = await Saisons.deleteOne ({ "id": id })
        return res.status(200).send(deletesaison)
        } catch (e) {
            throw e;
        }
    };

// Fonction qui crée une saison
const createSaison = async (req, res, next) => {
    try {
        // On récupere les données
        const { nom, promotion } = req.body;

        // On vérifie si la saison existe avec le nom
        const verif = await Saisons.findOne({ "nom": nom })
        if (verif) {
            return res.status(400).send({ Error: `Error, la saison : ${email} existe déja` });
        }

        // On recupere l'id max (si il y en a pas on met 1) de la collection Saisons et on ajoute a l'id 1
        const maxId = await Saisons.find({}).sort({id:-1}).limit(1);
        let newId;
        if (maxId.length === 0) {
            newId = 1
        } else {
            newId = maxId[0].id + 1
        }

        const newSaison = new Saisons({
            id: newId,
            nom: nom,
            promotion: promotion,
        });

        const saisonAdd = await newSaison.save();

        return res.status(200).send(saisonAdd)
    } catch (e) {
        throw e;
    }
};
module.exports = {
    findsaison,
    findsaisonMany,
    updateSaison,
    deleteSaison,
    createSaison
};