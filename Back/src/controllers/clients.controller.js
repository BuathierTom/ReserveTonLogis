const { v4 : uuidv4 } = require ('uuid');

const { findOne, 
        find, 
        insertOne, 
        deleteOne,
        updateOne
    } = require("../services/db/crud");


async function findClients(req,res, next){
try {
    const cursor = await find('clients', {});
    const result=[]
    await cursor.forEach((item)=>{
        result.push(item)
    });
        console.log(`Les clients ont bien été trouvés`)
        return res.send(result)
    } catch (e){
        console.log(e)
    }

}

async function createClient(req, res, next) {
    try {
        
        const nom = req.body.nom
        const prenom = req.body.prenom
        const adresse = req.body.adresse
        const telephone = req.body.telephone
        const email = req.body.email
        const password = req.body.password

        const verif = await findOne('clients', {nom: nom})
        if (verif) {
            console.log(`Error, l'utilisateur ${nom} existe déja`);
            return res.send({Error: `Error, l'utilisateur ${nom} existe déja`});
        }

        const result = await insertOne('clients', {nom: nom, prenom: prenom, adresse: adresse, telephone: telephone, email: email, password: password});
        console.log(`L'utilisateur ${nom}, qui a pour prenom : ${prenom} et l'id : ${id}`);
        return res.send(result)
    } catch (e){
        console.log(e)
    }
}




module.exports = {
    findClients,
    createClient,
  };

