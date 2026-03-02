import express from "express";
import { getEmi, getOneEmi, payEmi } from "../controllers/emiController";

const router = express.Router();

router.get("/:loanId",getEmi)
router.get("/pay/:emiId",getOneEmi)
router.put("/pay/:emiId",payEmi)

export default router;