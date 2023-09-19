import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Client } from '../entity';
// Envoi d'un mail
import * as nodemailer from 'nodemailer';

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

// Fonction pour insérer un client dans la base de données
export const createClients = async (req: Request, res: Response) => {

    try {
        // On récupere les informations des clients
        const { nom, prenom, adresse, telephone, email, password } = req.body;

        // On verifie si le client existe deja avec email
        const existingClient = await clientsRepository.findOne({
            where:{email}
        });

        // On revoie l'erreur si un email est le même
        if (existingClient) {
            return res.status(400).json({ message: "Un client avec le même mail existe déjà." });
        }
        
        // On créé un nouveau client
        const client = new Client();
        // On ajoute les données dans le clients
        client.adresse = adresse;
        client.email = email;
        client.nom = nom;
        client.prenom = prenom;
        client.telephone = telephone;
        client.password = password
        // On renvoie les données dans la BDD
        const result = await clientsRepository.save(client);
        // res.status(200).json(result);       

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Envoyer un e-mail à l'utilisateur
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Vous pouvez utiliser un autre service d'envoi d'e-mails ou configurer votre propre serveur SMTP
            auth: {
                user: 'Master',
                pass: 'Masterprod@',
            },
        });

        const mailOptions = {
            from: 'masterprod.iut@gmail.com',
            to: email, // Adresse e-mail de l'utilisateur nouvellement inscrit
            subject: 'Bienvenue sur notre site',
            text: 'Merci de vous être inscrit sur notre site. Nous sommes heureux de vous accueillir !',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });

        res.status(200).json(result);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch (e) {
        res.status(500).json(e);
        throw e;
    }

}

// Fonction pour delete un client dans la base de données
export const deleteClient = async (req: Request, res: Response) => {
    try {
        const id_client = req.params.id; // On récupère l'id du client à supprimer depuis l'URL
        
        // On vérifie que le client existe bien en base de données
        // const clientsRepository = getRepository(Client);

        // On vérifie que le client existe bien en base de données
        const clientToDelete = await clientsRepository.findOne({where:{id_client}});

        // Si le client n'existe pas, on renvoie une erreur
        if (!clientToDelete) {
            return res.status(404).json({ message: "Client non trouvé." });
        }

        // Si le client existe, on le supprime
        await clientsRepository.remove(clientToDelete);

        return res.status(204).end(); // 204 signifie "No Content" pour une suppression réussie sans renvoi de données.
    } catch (e) {
        console.error(`Erreur lors de la suppression du client : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la suppression du client." });
    }
};


// Fonction pour update un client dans la base de données
export const updateClient = async (req : Request, res : Response ) => {
    try {
        const { nom, prenom, adresse, telephone, email, password } = req.body; // On récupère l'id du client à supprimer depuis l'URL
        const id = req.params.id
        // On vérifie que le client existe bien en base de données
        // const clientsRepository = getRepository(Client);

        // On vérifie que le client existe bien en base de données
        const clientToUpdate = await clientsRepository.findOne({where:{id_client : id}});

        // Si le client n'existe pas, on renvoie une erreur
        if (!clientToUpdate) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        // On créé un nouveau client
        const client = new Client();
        client.adresse = adresse;
        client.email = email;
        client.nom = nom;
        client.prenom = prenom;
        client.telephone = telephone;
        client.password = password
        
        // Si le client existe, on update
        const result = await clientsRepository.update(clientToUpdate, client);
        return res.status(200).send(result); 
    }
    catch (e) {
        console.error(`Erreur lors de la suppression du client : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la mise à jour du client." });
    }
}

// Fonction de connexion
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // On vérifie que le client existe bien en base de données
        // const clientsRepository = getRepository(Client);

        // On vérifie que le client existe bien en base de données
        const client = await clientsRepository.findOne({where:{email}});

        // Si le client n'existe pas, on renvoie une erreur
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }

        // Si le client existe, on vérifie le mot de passe
        if (client.password === password) {
            return res.status(200).json(client);
        } else {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }
    } catch (e) {
        console.error(`Erreur lors de la connexion du client : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la connexion du client." });
    }
}