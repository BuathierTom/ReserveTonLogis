import express from "express";
const router = express.Router();
import { getSaison, createSaison, updateSaison, deleteSaison} from '../controllers';

router.use(express.urlencoded({ extended: false }));
router.get("/get", getSaison);
router.post("/create", createSaison);
router.put("/update/:id", updateSaison);
router.post("/delete/:id", deleteSaison);


export default router;


