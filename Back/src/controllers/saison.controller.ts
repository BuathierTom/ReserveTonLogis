import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Saison } from '../entity';

const SaisonRepository = AppDataSource.getRepository(Saison);

export const getSaison = async (req: Request, res: Response) => {
    try {
        const saison = await SaisonRepository.find();
        res.status(200).json(saison);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
}

// Fonction qui créer une saison dans la table
export const createSaison = async (req: Request, res: Response) => {
    try {
        // On récupere les informations des hotes
        const { nom , date_res, temperature, conditions_meteorologiques, promotion} = req.body;

        // On verifie si la saison existe deja avec son email
        const existingHote = await SaisonRepository.findOne({
            where:{nom}
        });

        // On revoie l'erreur si la saison existe deja
        if (existingHote) {
            return res.status(400).json({ message: "Un hote ayant le même mail existe déjà." });
        }
        
        // création de la saison
        const saison = new Saison();
        // On ajoute les données
        saison.nom = nom;
        saison.date_res = date_res;
        saison.temperature = temperature;
        saison.conditions_meteorologiques = conditions_meteorologiques;
        saison.promotion = promotion;

        // On renvoie les données dans la BDD
        const result = await SaisonRepository.save(saison);
        res.status(200).json(result);       
    } catch (e) {
        res.status(500).json(e);
        throw e;
    }
}

// Update saison
export const updateSaison = async (req : Request, res : Response ) => {
    try {
        const { nom , date_res, temperature, conditions_meteorologiques, promotion} = req.body;
        const id = req.params.id
        // On vérifie que la saison existe bien en base de données
        // const SaisonRepository = getRepository(Saison);

        // On vérifie que la saison existe bien en base de données
        const saisonToUpdate = await SaisonRepository.findOne({where:{id_saison : id}});

        // Si la saison n'existe pas, on renvoie une erreur
        if (!saisonToUpdate) {
            return res.status(404).json({ message: "Saison non trouvé." });
        }
        // Création de la saison
        const saison = new Saison();
        saison.nom = nom;
        saison.conditions_meteorologiques = conditions_meteorologiques
        saison.temperature = temperature
        saison.promotion = promotion
        saison.date_res = date_res
        
        // Si la saison existe, on update
        const result = await SaisonRepository.update(saisonToUpdate, saison);
        return res.status(200).send(result); 
    }
    catch (e) {
        console.error(`Erreur lors de la suppression de la saison : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la saison." });
    }
}

export const deleteSaison = async (req: Request, res: Response) => {
    try {
        const id_saison = req.params.id; // On récupère l'id de la saison à supprimer depuis l'URL
        
        // On vérifie que la saison existe bien en base de données
        // const SaisonRepository = getRepository(Client);

        // On vérifie que la saison existe bien en base de données
        const saisonToDelete = await SaisonRepository.findOne({where:{id_saison}});

        // Si la saison n'existe pas, on renvoie une erreur
        if (!saisonToDelete) {
            return res.status(404).json({ message: "Saison non trouvé." });
        }

        // Si la saison existe, on le supprime
        await SaisonRepository.remove(saisonToDelete);

        return res.status(204).end(); // 204 signifie "No Content" pour une suppression réussie sans renvoi de données.
    } catch (e) {
        console.error(`Erreur lors de la suppression de la saison : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la suppression de la saison." });
    }
};