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

// Fonction qui recherche une chambre dans le registre avec un filtre sur l'id 
const findsaison = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await Saisons.find({"id" : id})
        return res.status(200).send(getId)
    } catch (e) {
        throw e;
    }
};

// // Fonction qui update une chambre
// const updateChambre = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { nom, description, capacite, superficie, prix, disponibilite, avis, equipements, mots_cles, image1, image2, image3, image4} = req.body;
//         const verif = await Chambre.findOne({ "id": id })
//         if (!verif) {
//             return res.status(400).send({ Error: `Error, la chambre ${id} n'existe pas` });
//         }
//         const chambreupdate = await Chambre.updateOne({ "id": id }, {
//             nom: nom,
//             description: description,
//             capacite: capacite,
//             superficie: superficie,
//             prix: prix,
//             disponibilite: disponibilite,
//             avis: avis,
//             equipements: equipements,
//             mots_cles: mots_cles,
//             image1: image1,
//             image2: image2,
//             image3: image3,
//             image4: image4
//         })
//         return res.status(200).send(chambreupdate)
//     } catch (e) {
//         throw e;
//     }
// };

// // Delete chambre
// const deleteChambre = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const verif = await Chambre.findOne({ "id": id })
//         if (!verif) {
//             return res.status(400).send({ Error: `Error, la chambre ${id} n'existe pas` });
//         }

//         const deletechambre = await Chambre.deleteOne ({ "id": id })
//         return res.status(200).send(deletechambre)
//         } catch (e) {
//             throw e;
//         }
//     };

module.exports = {
    findsaison,
    findsaisonMany,
};