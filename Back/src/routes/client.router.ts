import express from "express";
const router = express.Router();
import { createClients, getClients, updateClient, deleteClient } from '../controllers';



router.use(express.urlencoded({ extended: false }));
router.get("/get", getClients);
router.post("/create", createClients);
router.post("/delete/:id", deleteClient);
router.put("/update/:id", updateClient);
// router.post("/create", updateClient);

export default router;


