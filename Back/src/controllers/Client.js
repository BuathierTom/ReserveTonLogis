const { db, pgp } = require("../services/connect.js"); // Assurez-vous d'importer pgp

async function getclient(req, res, next) {
    try {
        const query = pgp.as.format('SELECT * FROM clients WHERE id_client = $1', [1]); // Utilisez des paramètres pour la valeur
        const response = await db.any(query);
        console.log(response);
        res.status(200).json(response); // Renvoyez la réponse au client
    }
    catch (e) {
        console.log(`Erreur lors de l'exécution de la fonction getclient`);
        console.log(e);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérez l'erreur et renvoyez une réponse appropriée
    }
}

const { db } = require("./services/connect.js");

// Fonction de création d'un utilisateur
async function createClient(req, res, next) {
    try {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const adresse = req.body.adresse;
        const telephone = req.body.telephone;
        const email = req.body.email;
        const motDePasse = req.body.motDePasse;

        const query = pgp.as.format('INSERT INTO clients (nom, prenom, adresse, telephone, email, motDePasse) VALUES ($1, $2, $3, $4, $5, $6)', [nom, prenom, adresse, telephone, email, motDePasse])
        const reponse = await db.any(query)
        console.log(reponse)
        
    } catch (e) {
        console.log(`Erreur lors de l'execution de la fonction createUser`);
        console.log(e);
        throw e;
    }
}

module.exports = {
    getclient,
    createClient
};
