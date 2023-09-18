import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Chambre } from '../entity';

const chambreRepository = AppDataSource.getRepository(Chambre);

export const getChambre = async (req: Request, res: Response) => {

    try {
        const chambres = await chambreRepository.find();
        res.status(200).json(chambres);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

}

export const createChambres = async (req: Request, res: Response) => {
    try {
        // On récupere les informations des chambres
        const { nom, description, capacite, prix, disponibilite, avis, equipements, mots_cles} = req.body;

        // On verifie si la chambre existe deja avec son nom
        const existingChambre = await chambreRepository.findOne({
            where:{nom}
        });

        // On revoie l'erreur si une chambre existe déjà
        if (existingChambre) {
            return res.status(400).json({ message: "Une chambre ayant le même nom existe déjà." });
        }
        
        // On créé une nouvelle chambre
        const chambres = new Chambre();
        // On ajoute les données 
        chambres.nom = nom;
        chambres.description = description;
        chambres.capacite = capacite;
        chambres.prix = prix;
        chambres.disponibilite = disponibilite;
        chambres.avis = avis;
        chambres.equipements = equipements;
        chambres.mots_cles = mots_cles;

        // On renvoie les données dans la BDD
        const result = await chambreRepository.save(chambres);
        res.status(200).json(result);       
    } catch (e) {
        res.status(500).json(e);
        throw e;
    }

}

// Fonction pour update une chambre dans la base de données
export const updateChambre = async (req : Request, res : Response ) => {
    try {
        const { nom, description, capacite, prix, disponibilite, avis, equipements, mots_cles} = req.body; // On récupère l'id de la chambre à supprimer depuis l'URL
        const id = req.params.id
        // On vérifie que la chambre existe bien en base de données
        // const chambresRepository = getRepository(Client);

        // On vérifie que la chambre existe bien en base de données
        const chambreToUpdate = await chambreRepository.findOne({where:{id_chambre : id}});

        // Si la chambre n'existe pas, on renvoie une erreur
        if (!chambreToUpdate) {
            return res.status(404).json({ message: "Chambre non trouvé." });
        }
        // On créé une nouvelle chambre
        const chambres = new Chambre();
        chambres.nom = nom;
        chambres.description = description;
        chambres.capacite = capacite;
        chambres.prix = prix;
        chambres.disponibilite = disponibilite;
        chambres.avis = avis;
        chambres.equipements = equipements;
        chambres.mots_cles = mots_cles;
        
        // Si la chambre existe, on update
        const result = await chambreRepository.update(chambreToUpdate, chambres);
        return res.status(200).send(result); 
    }
    catch (e) {
        console.error(`Erreur lors de la mise à jour de la chambre : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la chambre." });
    }
}

export const deleteChambre = async (req: Request, res: Response) => {
    try {
        const id_chambre = req.params.id; // On récupère l'id de la chambre à supprimer depuis l'URL
        
        // On vérifie que la chambre existe bien en base de données
        // const chambresRepository = getRepository(Client);

        // On vérifie que la chambre existe bien en base de données
        const chambreToDelete = await chambreRepository.findOne({where:{id_chambre}});

        // Si la chambre n'existe pas, on renvoie une erreur
        if (!chambreToDelete) {
            return res.status(404).json({ message: "Chambre non trouvé." });
        }

        // Si la chambre existe, on le supprime
        await chambreRepository.remove(chambreToDelete);

        return res.status(204).end(); // 204 signifie "No Content" pour une suppression réussie sans renvoi de données.
    } catch (e) {
        console.error(`Erreur lors de la suppression de la chambre : ${e.message}`);
        res.status(500).json({ message: "Erreur lors de la suppression de la chmabre." });
    }
};