import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Hotes } from '../entity';

const HoteRepository = AppDataSource.getRepository(Hotes);

export const getHote = async (req: Request, res: Response) => {
    try {
        const hotes = await HoteRepository.find();
        res.status(200).json(hotes);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
}

export const createHote = async (req: Request, res: Response) => {
    try {
        // On récupere les informations des hotes
        const { nom, adresse, telephone, email} = req.body;

        // On verifie si l'hote existe deja avec son email
        const existingHote = await HoteRepository.findOne({
            where:{email}
        });

        // On revoie l'erreur si un email est le même
        if (existingHote) {
            return res.status(400).json({ message: "Un hote ayant le même mail existe déjà." });
        }
        
        // création de l'hote
        const hotes = new Hotes();
        // On ajoute les données
        hotes.nom = nom;
        hotes.adresse = adresse;
        hotes.telephone = telephone;
        hotes.email = email;
        // On renvoie les données dans la BDD
        const result = await HoteRepository.save(hotes);
        res.status(200).json(result);       
    } catch (e) {
        res.status(500).json(e);
        throw e;
    }

}


// Update hote
export const updateHote = async (req : Request, res : Response ) => {
    try {
        const { nom, adresse, telephone, email } = req.body;
        const id = req.params.id
        // On vérifie que l'hote existe bien en base de données
        // const clientsRepository = getRepository(Hotes);

        // On vérifie que l'hote existe bien en base de données
        const hoteToUpdate = await HoteRepository.findOne({where:{id_hote : id}});

        // Si l'hote n'existe pas, on renvoie une erreur
        if (!hoteToUpdate) {
            return res.status(404).json({ message: "Hote non trouvé." });
        }
        // Création de l'hote
        const hotes = new Hotes();
        hotes.adresse = adresse;
        hotes.email = email;
        hotes.nom = nom;
        hotes.telephone = telephone;
        
        
        // Si l'hote existe, on update
        const result = await HoteRepository.update(hoteToUpdate, hotes);
        return res.status(200).send(result); 
    }
    catch (e) {
        console.error(`Erreur lors de la suppression de l'hote : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'hote." });
    }
}

export const deleteHote = async (req: Request, res: Response) => {
    try {
        const id_hote = req.params.id; // On récupère l'id de l'hote à supprimer depuis l'URL
        
        // On vérifie que l'hote existe bien en base de données
        // const clientsRepository = getRepository(Client);

        // On vérifie que l'hote existe bien en base de données
        const hoteToDelete = await HoteRepository.findOne({where:{id_hote}});

        // Si l'hote n'existe pas, on renvoie une erreur
        if (!hoteToDelete) {
            return res.status(404).json({ message: "Hote non trouvé." });
        }

        // Si l'hote existe, on le supprime
        await HoteRepository.remove(hoteToDelete);

        return res.status(204).end(); // 204 signifie "No Content" pour une suppression réussie sans renvoi de données.
    } catch (e) {
        console.error(`Erreur lors de la suppression de l'hote : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la suppression de l'hote." });
    }
};