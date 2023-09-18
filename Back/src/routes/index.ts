import express from "express";
import useClientRouter from './client.router'
import useChambreRouter from './chambre.router'
import useHoteRouter from './hote.router'
const router = express.Router();

router.use('/chambres',useChambreRouter)
router.use('/clients',useClientRouter)
router.use('/hotes',useHoteRouter)

export default router;

