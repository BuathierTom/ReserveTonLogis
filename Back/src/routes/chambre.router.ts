import express from "express";
const router = express.Router();
import { getChambre, createChambres, updateChambre, deleteChambre} from '../controllers';

router.use(express.urlencoded({ extended: false }));
router.get("/get", getChambre);
router.post("/create", createChambres);
router.put("/update/:id", updateChambre);
router.post("/delete/:id", deleteChambre);


export default router;


