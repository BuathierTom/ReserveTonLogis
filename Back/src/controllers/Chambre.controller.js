const Chambre = require('../models/chambre.model');
const { addLog } = require("../services/logs/logs");

// Fonction qui recherche toutes les chambres
const findchambreMany = async (req, res) => {
    try {
        const getAll = await Chambre.find({});
        addLog("info", `getAll des chambres`, "chambre.controller.js");
        return res.status(200).send(getAll);    
    } catch (e) {
        addLog("error", e, "chambre.controller.js");
    }
};

// Fonction qui recherche une chambre dans le registre avec un filtre sur l'id 
const findChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await Chambre.find({"id" : id})
        addLog("info", `getId de la chambre ${id}`, "chambre.controller.js");
        return res.status(200).send(getId)
    } catch (e) {
        addLog("error", e, "chambre.controller.js");
    }
};

// Fonction qui update une chambre
const updateChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, description, capacite, superficie, prix, disponibilite, avis, equipements, mots_cles, image1, image2, image3, image4} = req.body;
        const verif = await Chambre.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Error, la chambre ${id} n'existe pas`, "chambre.controller.js");
            return res.status(404).send({ Error: `Error, la chambre n'existe pas` });
        }
        const chambreupdate = await Chambre.updateOne({ "id": id }, {
            nom: nom,
            description: description,
            capacite: capacite,
            superficie: superficie,
            prix: prix,
            disponibilite: disponibilite,
            avis: avis,
            equipements: equipements,
            mots_cles: mots_cles,
            image1: image1,
            image2: image2,
            image3: image3,
            image4: image4
        })
        addLog("info", `updateChambre de la chambre ${id}`, "chambre.controller.js");
        return res.status(200).send(chambreupdate)
    } catch (e) {
        addLog("error", e, "chambre.controller.js");
    }
};

// Delete chambre
const deleteChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const verif = await Chambre.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Error, la chambre ${id} n'existe pas`, "chambre.controller.js");
            return res.status(404).send({ Error: `Error, la chambre n'existe pas` });
        }

        const deletechambre = await Chambre.deleteOne ({ "id": id })
        addLog("info", `deleteChambre de la chambre ${id}`, "chambre.controller.js");
        return res.status(200).send(deletechambre)
    } catch (e) {
        addLog("error", e, "chambre.controller.js");
    }
};

module.exports = {
    findChambre,
    findchambreMany,
    updateChambre,
    deleteChambre
};