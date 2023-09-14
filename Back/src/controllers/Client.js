const crud = require('../services/crud.js')

// Fonction de création d'un utilisateur
async function createClient(req, res, next) {
    try {
        let test = await crud.insertOne('Clients', req.body)
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction createUser`);
        console.log(e);
        throw e;
    }
}

// Fonction de recherche d'un utilisateur avec son nom
// A supprimer par la suite

async function findClient(req, res, next) {
    try {
        let nom = req.params.nom;
        let test = await crud.findOne('Clients', {"nom" : nom})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findUser`);
        console.log(e);
        throw e;
    }
}

// Fonction de recherche de tous les utilisateurs
// A supprimer par la suite

async function findClientmany(req, res) {
    try {
        let nom = req.params.nom;
        let test = await crud.find('Clients')
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findUser`);
        console.log(e);
        throw e;
    }
}

// Modifier les informations personnelles d'un utilisateur
async function updateClient(req, res) {
    try {
        let id = req.params.id;
        let test = await crud.updateOne('Clients', {"nom" : id },{$set: { "nom": req.body.id_item}})
        return res.send(test)
    }
    catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateItemStatus`);
        console.log(e);
        throw e;
    }
}

module.exports = {
    createClient,
    findClient,
    findClientmany,
    updateClient
};