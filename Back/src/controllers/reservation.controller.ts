import { Request, Response } from 'express'
import { AppDataSource } from '../config/database-config';
import { Reservation, Client, Chambre } from '../entity';


const reservationRepository = AppDataSource.getRepository(Reservation);
const clientRepository = AppDataSource.getRepository(Client);
const chambreRepository = AppDataSource.getRepository(Chambre);

const relations = ['client', 'chambre']
// Fonction qui renvoie toutes les reservations dans la table reservations
export const getReservation = async (req: Request, res: Response) => {
    try {
        
        const reserv = await reservationRepository.find({relations: relations});
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
        const { date_arrive, date_depart, nb_personnes, prix_total, id_client, id_chambre } = req.body;

        // on verifie si le client existe
        const client = await clientRepository.findOne({
            where: {id_client}
        });

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        // on verifie si la chambre existe
        const chambre = await chambreRepository.findOne({
            where: {id_chambre}
        });

        if (!chambre) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        // On vérifie que la date d'arrivée est pas celle du jour
        const date = new Date();
        console.log(date);
        // if (date_arrive === date) {
        //     return res.status(400).json({ message: 'La date d\'arrivée ne peut pas être celle du jour' });
        // }

        

        // On créer la reservation
        const reservation = new Reservation();

        reservation.date_arrive = date_arrive;
        reservation.date_depart = date_depart;
        reservation.nb_personnes = nb_personnes;
        reservation.prix_total = prix_total;
        reservation.client = req.body.id_client;
        reservation.chambre = req.body.id_chambre;

        const result = await reservationRepository.save(reservation);

        res.status(200).json(result);   

    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

}


