import express from "express";
import createLoanApp from "../controllers/loanapplicationcontrol.js";
// import { createLoanApplication, getAllApplications, getAllLoanTypes, getMyApplications, updateApplicationStatus } from "../controllers/loanApplicationController.js";

const router = express.Router();

// router.get("/loantypes",getAllLoanTypes);
// router.post("/applyloan",createLoanApplication);
// router.get("/myapplication",getMyApplications);


// router.get("/all-app",getAllApplications);
// router.patch("/:id",updateApplicationStatus)

router.post ("/apply-loan",createLoanApp)

export default router;


// GET http://localhost:3000/api/loanapp/loantypes
// POST http://localhost:3000/api/loanapp/applyloan
// GET http://localhost:3000/api/loanapp/myapplication

// GET http://localhost:3000/api/loanapp/all-app
// PATCH http://localhost:3000/api/loanapp/:id