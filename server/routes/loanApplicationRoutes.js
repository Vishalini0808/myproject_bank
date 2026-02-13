import express from "express";
import { createLoanApplication, getAllApplications, getAllLoanTypes, getMyApplications, updateApplicationStatus } from "../controllers/loanApplicationController.js";

const router = express.Router();

router.get("/loantypes",getAllLoanTypes);
router.post("/applyloan",createLoanApplication);
router.get("/myapplication",getMyApplications);


router.get("/all-app",getAllApplications);
router.patch("/:id",updateApplicationStatus)

export default router;


// GET http://localhost:3000/api/loanapp/loantypes
// POST http://localhost:3000/api/loanapp/applyloan