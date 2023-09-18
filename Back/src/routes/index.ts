import express from "express";
import useClientRouter from './client.router'
const router = express.Router();


router.use('/clients',useClientRouter)

export default router;

