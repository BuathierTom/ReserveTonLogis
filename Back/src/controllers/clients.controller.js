const { v4 : uuidv4 } = require ('uuid');
const crud = require('../services/db/crud')
const { getCollection } = require('../services/db/connect.js');



async function findClients(req,res, next){
    try {
        const cursor = await crud.find("client");

        return res.send(cursor)
    } catch (e){
        console.log(e)
    }

}

// async function findClients(req, res) {
//     try {
//         const  collection = getCollection("clients");
//         const  result = await  collection.find({});

//         // let test = await crud.find('clients', {})
//         return res.send(result)
//     } catch (e) {
//         console.log(`Erreur lors de l execution de la fonction findChambre`);
//         console.log(e);
//         throw e;
//     }
// }

async function createClient(req, res, next) {
    try {

        const nom = req.body.nom
        const prenom = req.body.prenom
        const adresse = req.body.adresse
        const telephone = req.body.telephone
        const email = req.body.email
        const password = req.body.password

        const verif = await crud.findOne('clients', { nom: nom })
        if (verif) {
            console.log(`Error, l'utilisateur ${nom} existe déja`);
            return res.send({ Error: `Error, l'utilisateur ${nom} existe déja` });
        }

        const result = await insertOne('clients', { nom: nom, prenom: prenom, adresse: adresse, telephone: telephone, email: email, password: password });
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

