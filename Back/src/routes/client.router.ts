import express from "express";
const router = express.Router();
import { getClients } from '../controllers';


router.use(express.urlencoded({ extended: false }));
router.get("/get", getClients);
// router.post("/create", createClient);

export default router;


