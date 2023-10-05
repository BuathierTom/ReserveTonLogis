const Client = require('../models/client.model');
// Hacher mdp : npm install bcrypt
const bcrypt = require('bcrypt');

// Fonction qui recherche tous les clients
const findClients = async (req, res, next) => {
    try {
        const result = await Client.find({});
        return res.status(200).json(result)
    } catch (e){
        throw e;
    }

};

// Fonction qui créé un client
const createClient = async (req, res, next) => {
    try {
        // On récupere les données
        const { nom, prenom, adresse, telephone, email, password } = req.body;

        // On vérifie si l'utilisateur avec l'email existe déja
        const verif = await Client.findOne({ "email": email })
        if (verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur avec l'email : ${email} existe déja` });
        }

        // On recupere l'id max (si il y en a pas on met 1) de la collection Client et on ajoute a l'id 1
        const maxId = await Client.find({}).sort({id:-1}).limit(1);
        let newId;
        if (maxId.length === 0) {
            newId = 1
        } else {
            newId = maxId[0].id + 1
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de salages
        
        const newClient = new Client({
            id: newId,
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: hashedPassword,
        });

        const clientAdd = await newClient.save();

        return res.status(200).send(clientAdd)
    } catch (e) {
        throw e;
    }
};

// Fonction qui delete un client
const deleteClient = async (req, res, next) => {
    try {
        const { email } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "email": email })
        if (!verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas` });
        }

        const deleteClient = await Client.deleteOne({ "email": email })
        return res.status(200).send(deleteClient)
    } catch (e) {
        throw e;
    }
};

// Fonction qui update un client
const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse, telephone, email, password } = req.body;
        // On verifie si l'utilisateur existe
        const verif = await Client.findOne({ "id": id })
        if (!verif) {
            return res.status(400).send({ Error: `Error, l'utilisateur avec l'id : ${id} n'existe pas` });
        }

        const updateClient = await Client.updateOne({ "id": id }, {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            telephone: telephone,
            email: email,
            password: password,
        })
        return res.status(200).send(updateClient)
    } catch (e) {
        throw e;
    }
};

// Fonction de connexion par mail et mot de passe 
const connectClient = async (req, res, next) => {
    const { email, password } = req.body;
    // On verifie si l'utilisateur existe
    const verif = await Client.findOne({ "email": email })
    if (!verif) {
        return res.status(400).send({ Error: `Error, l'utilisateur avec l'adresse mail : ${email} n'existe pas` });
    }

    // On verifie si le mot de passe est correct
    const verifPassword = await bcrypt.compare(password, verif.password);
    if (!verifPassword) {
        return res.status(400).send({ Error: `Error, le mot de passe est incorrect` });
    }
    //console.log("client connecté")
    return res.status(200).send(verif)
    
};

module.exports = {
    findClients,
    createClient,
    deleteClient,
    updateClient,
    connectClient
};

