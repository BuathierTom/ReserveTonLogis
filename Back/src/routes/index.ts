import express from "express";
import useClientRouter from './client.router'
import useChambreRouter from './chambre.router'
import useHoteRouter from './hote.router'
import useSaison from './saison.router'
import useReservation from './reservation.router'

const router = express.Router();

router.use('/chambres',useChambreRouter)
router.use('/clients',useClientRouter)
router.use('/hotes',useHoteRouter)
router.use('/saisons',useSaison)
router.use('/reservations',useReservation)


export default router;

