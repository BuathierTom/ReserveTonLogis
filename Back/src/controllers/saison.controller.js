const Saisons = require('../models/saison.model');
const { addLog } = require("../services/logs/logs");

/**
 * Récupere toutes les saisons créées.
 * 
 * @function findSaisonMany
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant toutes les saisons.
 * @throws {Error} - Si il y a une erreur lors de la récupération des saisons.
 */
const findSaisonMany = async (req, res) => {
    try {
        const getAll = await Saisons.find({});
        addLog("info", `getAll des saisons`, "saison.controller.js");
        return res.status(200).send(getAll);
    } catch (e) {
        addLog("error", e, "saison.controller.js");
    }
};

/**
 * Réupere une saison en fonction de l'id de la saison.
 * 
 * @function findSaison
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la saison.
 * @throws {Error} - Si il y a une erreur lors de la récupération de la saison.
 */
const findSaison = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await Saisons.find({"id" : id})
        addLog("info", `getId de la saison ${id}`, "saison.controller.js");
        return res.status(200).send(getId)
    } catch (e) {
        addLog("error", e, "saison.controller.js");
    }
};

/**
 * Créer une saison en récupérant le nom et la promotion.
 * 
 * @function createSaison
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la saison créée.
 * @throws {Error} - Si la saison existe déja.
 * @throws {Error} - Si il y a une erreur lors de la création de la saison.
 */
const createSaison = async (req, res) => {
    try {
        // On récupere les données
        const { nom, promotion } = req.body;

        // On vérifie si la saison existe avec le nom
        const verif = await Saisons.findOne({ "nom": nom })
        if (verif) {
            addLog("error", `Error, la saison : ${nom} existe déja`, "saison.controller.js");
            return res.status(404).send({ Error: `Error, la saison existe déja` });
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

        addLog("info", `createSaison de la saison ${nom}`, "saison.controller.js");
        return res.status(200).send(saisonAdd)
    } catch (e) {
        addLog("error", e, "saison.controller.js");
    }
};


/**
 * Modifie une saison en fonction de l'id de la saison.
 * 
 * @function updateSaison
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la saison modifiée.
 * @throws {Error} - Si la saison n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la modification de la saison.
 */
const updateSaison = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, promotion} = req.body;
        const verif = await Saisons.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Error, la saison ${id} n'existe pas`, "saison.controller.js");
            return res.status(404).send({ Error: `Error, la saison n'existe pas` });
        }
        const saisonupdate = await Saisons.updateOne({ "id": id }, {
            nom: nom,
            promotion: promotion,
        })

        addLog("info", `updateSaison de la saison ${id}`, "saison.controller.js");
        return res.status(200).send(saisonupdate)
    } catch (e) {
        addLog("error", e, "saison.controller.js");
    }
};

/**
 * Supprime une saison en fonction de l'id de la saison.
 * 
 * @function deleteSaison
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - La réponse de la requête.
 * @returns {Promise<Object>} - Un tableau JSON contenant la saison supprimée.
 * @throws {Error} - Si la saison n'existe pas.
 * @throws {Error} - Si il y a une erreur lors de la suppression de la saison.
 */
const deleteSaison = async (req, res) => {
    try {
        const id = req.params.id;
        const verif = await Saisons.findOne({ "id": id })
        if (!verif) {
            addLog("error", `Error, la saison ${id} n'existe pas`, "saison.controller.js");
            return res.status(404).send({ Error: `Error, la saison n'existe pas` });
        }
        const deletesaison = await Saisons.deleteOne ({ "id": id })

        addLog("info", `deleteSaison de la saison ${id}`, "saison.controller.js");
        return res.status(200).send(deletesaison)
        } catch (e) {
            addLog("error", e, "saison.controller.js");
        }
    };


module.exports = {
    findSaison,
    findSaisonMany,
    updateSaison,
    deleteSaison,
    createSaison
};