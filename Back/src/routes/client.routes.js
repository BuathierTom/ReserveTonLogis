const express = require("express");
const router = express.Router();
const { findClients, createClient, deleteClient, updateClient, connectClient, getClientReservationById, findOneClients, updatePassword } = require("../controllers/client.controller.js");

/**
 * @swagger
 * /clients/getAll:
 *  get:
 *      summary: Récupère tous les clients de la base.
 *      responses:
 *        200:
 *          description: Opération réussie. Retourne la liste de tous les clients.
 *          content:
 *            application/json:
 *              example:
 *              - _id: "651d7ea02a10f6207ad47ef8"
 *                id: 1
 *                nom: "Gambert"
 *                prenom: "Adrien"
 *                adresse: "12 rue les bains"
 *                telephone: "0612345678"
 *                email: "masterprod@gmail.com"
 *                password: "$2b$10$elC6nwU4Mg8TaJLrikrhI.TFR7Mwx0DxZ8wzw3LRS57OF0rJi"
 *                __v: 0
 *        500:
 *          description: Erreur serveur. Une erreur s'est produite lors de la récupération des clients.
 */
router.get("/getAll", findClients)
/**
 * @swagger
 * /clients/get:
 *  get:
 *      summary: Récupère un client en fonction de son ID.
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: ID du client à récupérer.
 *      responses:
 *        200:
 *          description: Opération réussie. Retourne le client correspondant à l'ID.
 *          content:
 *            application/json:
 *              example:
 *                _id: "651d7ea02a10f6207ad47ef8"
 *                id: 1
 *                nom: "Gambert"
 *                prenom: "Adrien"
 *                adresse: "12 rue les bains"
 *                telephone: "0612345678"
 *                email: "masterprod@gmail.com"
 *                password: "$2b$10$elC6nwU4Mg8TaJLrikrhI.TFR7Mwx0DxZ8wzw3LRS57OF0rJi"
 *                __v: 0
 *        400:
 *          description: Requête invalide. L'ID du client est manquant ou incorrect.
 *        404:
 *          description: Client non trouvé. Aucun client correspondant à l'ID spécifié.
 *        401:
 *          description: Non autorisé. L'utilisateur n'a pas fourni de token JWT valide.
 *        500:
 *          description: Erreur serveur. Une erreur s'est produite lors de la récupération du client.
 */
router.get("/get", findOneClients)
// Permet de récupérer une reservation en fonction de l'id du client
router.get("/getReservation", getClientReservationById)
// Permet de créer un client
router.post("/create", createClient)
// Permet de supprimer un client
router.post("/delete", deleteClient)
// Permet de modifier un client
router.post("/update", updateClient)
/**
 * @swagger
 * /clients/connect:
 *  post:
 *      summary: Connectez-vous en utilisant un email et un mot de passe.
 *      parameters:
 *        - in: formData
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          description: E-mail du client à récupérer.
 *        - in: formData
 *          name: password
 *          schema:
 *            type: string
 *          required: true
 *          description: Mot de passe du client à récupérer. 
 *      responses:
 *        200:
 *          description: Connexion réussie. L'utilisateur est connecté.
 *        400:
 *          description: Requête invalide. Les paramètres email ou password sont manquants ou incorrects.
 *        401:
 *          description: Échec de l'authentification. Les informations d'identification sont incorrectes.
 *        500:
 *          description: Erreur serveur. Une erreur s'est produite lors de la connexion.
 */
router.post("/connect", connectClient)

/**
 * @swagger
 * /clients/connect:
 *  post:
 *      summary: Change le mot de passe d'un client en utilisant un email et un mot de passe.
 *      parameters:
 *        - in: formData
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          description: E-mail du client à récupérer.
 *        - in: formData
 *          name: password
 *          schema:
 *            type: string
 *          required: true
 *        - in: formData
 *          name: newPassword
 *          schema:
 *            type: string
 *          required: true
 *          description: Nouveau mot de passe du client à récupérer. 
 *      responses:
 *        200:
 *          description: Connexion réussie. L'utilisateur est connecté.
 *        400:
 *          description: Requête invalide. Les paramètres email ou password sont manquants ou incorrects.
 *        401:
 *          description: Échec de l'authentification. Les informations d'identification sont incorrectes.
 *        500:
 *          description: Erreur serveur. Une erreur s'est produite lors de la connexion.
 */
router.post("/updatePassword", updatePassword);



module.exports = router;