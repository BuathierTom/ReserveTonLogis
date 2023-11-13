const Chambre = require('../models/chambre.model');
const { addLog } = require("../services/logs/logs");

/**
 * Récupere toutes les chambres créées.
 * 
 * @function findchambreMany
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant toutes les chambres.
 * @throws {Error} - Si il y a une erreur lors de la récupération des chambres.
 */
const findchambreMany = async (req, res) => {
    try {
        const getAll = await Chambre.find({});
        addLog("info", `getAll des chambres`, "chambre.controller.js");
        return res.status(200).send(getAll);    
    } catch (e) {
        addLog("error", e, "chambre.controller.js");
    }
};

/**
 * Récupere une chambre en fonction de l'id de la chambre.
 * 
 * @function findChambre
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la chambre.
 * @throws {Error} - Si il y a une erreur lors de la récupération de la chambre.
 */
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

/**
 * Met à jour une chambre en fonction de l'id.
 * 
 * @function updateChambre
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la chambre.
 * @throws {Error} - Si il y a une erreur lors de la mise à jour de la chambre.
 * @throws {Error} - Si la chambre n'existe pas.
 */
const updateChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, description, capacite, superficie, prix, disponibilite, avis, equipements, mots_cles, image1, image2, image3, image4} = req.body;
        const verif = await Chambre.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Erreur, la chambre ${id} n'existe pas`, "chambre.controller.js");
            return res.status(404).send({ Error: `Erreur, la chambre n'existe pas` });
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

/**
 * Supprime une chambre en fonction de l'id.
 * 
 * @function deleteChambre
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la chambre supprimée.
 * @throws {Error} - Si il y a une erreur lors de la suppression de la chambre.
 * @throws {Error} - Si la chambre n'existe pas.
 */
const deleteChambre = async (req, res) => {
    try {
        const id = req.params.id;
        const verif = await Chambre.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Erreur, la chambre ${id} n'existe pas`, "chambre.controller.js");
            return res.status(404).send({ Error: `Erreur, la chambre n'existe pas` });
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