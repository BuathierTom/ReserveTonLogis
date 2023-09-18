import express from "express";
const router = express.Router();
import { getHote, createHote, updateHote, deleteHote} from '../controllers';

router.use(express.urlencoded({ extended: false }));
router.get("/get", getHote);
router.post("/create", createHote);
router.put("/update/:id", updateHote);
router.post("/delete/:id", deleteHote);


export default router;


