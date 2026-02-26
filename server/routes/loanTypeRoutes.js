import express from "express";
import getAllLoanTypes from "../controllers/loanTypeController.js";

const router = express.Router();

router.get("/getlt",getAllLoanTypes);

export default router;


// http://localhost:3000/api/loantype/getlt