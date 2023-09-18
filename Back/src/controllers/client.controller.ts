//const { db, pgp } = require("../services/connect.js"); 
// const pgp = require('pg-promise')();
// const { db } = require('../services/connect.js'); 
// Assurez-vous que 'pgp' et 'db' sont correctement configurés avant d'appeler la fonction 'getclient'.

// const getclient = async (req, res, next) => {
//     try {
//         // console.log("1");
//         const query = pgp.as.format('SELECT * FROM clients WHERE id_client = 2');
//         // console.log("2");
//         const response = await db.any(query);
//         // console.log("3");
//         res.status(200).json(response);
//         //next();
//         // res.status(200).json(response);
//     } catch (e) {
//         // console.log(`Erreur lors de l'exécution de la fonction getclient`);
//         // console.error(e);
//         // res.status(500).json({ message: 'Erreur serveur' });
//         throw e;
//     }
// }


// // Fonction de création d'un utilisateur
// async function createClient(req, res, next) {
//     try {
//         // Récuperation des variables pour les utilisés dans la requête SQL
//         const nom = req.body.nom;
//         const prenom = req.body.prenom;
//         const adresse = req.body.adresse;
//         const telephone = req.body.telephone;
//         const email = req.body.email;
//         const motDePasse = req.body.motDePasse;
//         // On fait la requête avec les variables récupérés
//         const query = pgp.as.format('INSERT INTO clients (nom, prenom, adresse, telephone, email, motDePasse) VALUES ($1, $2, $3, $4, $5, $6)', 
//                                     [nom, prenom, adresse, telephone, email, motDePasse])
//         const reponse = await db.any(query)
//         // On affiche la réponse
//         console.log(reponse)
//     } catch (e) {
//         // Si il y a une erreur
//         console.log(`Erreur lors de l'execution de la fonction createUser`);
//         console.log(e);
//         throw e;
//     }
// }

// module.exports = {
//     getclient,
//     createClient
// };


import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Client } from '../entity';

const clientsRepository = AppDataSource.getRepository(Client);

export const getClients = async (req: Request, res: Response) => {

    try {
        const clients = await clientsRepository.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

}
