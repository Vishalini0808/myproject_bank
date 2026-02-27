import express from "express";
import createLoanApp, { getAllApplications } from "../controllers/loanapplicationcontrol.js";
import { uploadLoanDocs } from "../middleware/filestorageMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import { createLoanApplication, getAllApplications, getAllLoanTypes, getMyApplications, updateApplicationStatus } from "../controllers/loanApplicationController.js";

const router = express.Router();

// router.get("/loantypes",getAllLoanTypes);
// router.post("/applyloan",createLoanApplication);


// router.get("/all-app",getAllApplications);
// router.patch("/:id",updateApplicationStatus)

router.get("/allapplication",authMiddleware,getAllApplications);
router.post ("/apply-loan",authMiddleware,uploadLoanDocs,createLoanApp)

export default router;


// GET http://localhost:3000/api/loanapp/loantypes
// POST http://localhost:3000/api/loanapp/apply-loan
// GET http://localhost:3000/api/loanapp/allapplication

// GET http://localhost:3000/api/loanapp/all-app
// PATCH http://localhost:3000/api/loanapp/:id