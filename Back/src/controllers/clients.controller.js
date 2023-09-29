const mongoose = require('mongoose');
const { v4 : uuidv4 } = require ('uuid');
const crud = require('../services/db/crud')
const { getCollection } = require('../services/db/connect.js');
const { clients } = require('../models/client.model.js');

async function findClients(req,res, next){
    try {
        const clientCollection = getCollection('clients');

        const cursor = await clientCollection.find({});

        return res.send(cursor)
    } catch (e){
        console.log(e)
    }

}

async function createClient(req, res, next) {
    try {

        const clientCollection = getCollection('clients');


        const nom = req.body.nom
        const prenom = req.body.prenom
        const adresse = req.body.adresse
        const telephone = req.body.telephone
        const email = req.body.email
        const password = req.body.password

        const verif = await clientCollection.findOne({ nom: nom })
        if (verif) {
            console.log(`Error, l'utilisateur ${nom} existe déja`);
            return res.send({ Error: `Error, l'utilisateur ${nom} existe déja` });
        }

        const result = await clientCollection.insertOne('clients', { nom: nom, prenom: prenom, adresse: adresse, telephone: telephone, email: email, password: password });
        console.log(`L'utilisateur ${nom}, qui a pour prenom : ${prenom} et l'id : ${id}`);
        return res.send(result)
    } catch (e) {
        console.log(e)
    }
}




module.exports = {
    findClients,
    createClient,
};

