import {Request, Response} from 'express'
import { AppDataSource } from '../config/database-config';
import { Reservation } from '../entity';

const reservationsRepository = AppDataSource.getRepository(Reservation);

// Fonction qui renvoie toutes les reservations dans la table reservations
export const getReservations = async (req: Request, res: Response) => {
    try {
        const reserv = await reservationsRepository.find();
        res.status(200).json(reserv);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
}

// Fonction qui créer une reservation dans la table
export const createReservation = async (req: Request, res: Response) => {
    try {
        // On récupere les informations de la reservation
        const { date_arrive, date_depart, nb_personnes, prix_total } = req.body;
            
        


        // res.status(200).json(result);   

    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

}


