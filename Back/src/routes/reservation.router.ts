import express from "express";
const router = express.Router();
import { getReservation, createReservation } from '../controllers';



router.use(express.urlencoded({ extended: false }));
router.get("/get", getReservation);
router.post("/create", createReservation);

// router.post("/delete/:id", deleteClient);
// router.put("/update/:id", updateClient);

export default router;


