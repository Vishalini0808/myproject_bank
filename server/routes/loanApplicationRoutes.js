import express from "express";
import createLoanApp, { getAllApplications, reviewApplication } from "../controllers/loanapplicationcontrol.js";
import { uploadLoanDocs } from "../middleware/filestorageMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { LoanStatus, updateApplication } from "../controllers/loanStatusController.js";
// import roleMiddleware from "../middleware/roleMiddleware.js";
// import { createLoanApplication, getAllApplications, getAllLoanTypes, getMyApplications, updateApplicationStatus } from "../controllers/loanApplicationController.js";

const router = express.Router();

// router.post("/applyloan",createLoanApplication);
// router.get("/all-app",getAllApplications);
// router.patch("/:id",updateApplicationStatus)

router.post ("/apply-loan",authMiddleware,uploadLoanDocs,createLoanApp);
router.get("/allapplication",authMiddleware,getAllApplications);
router.get("/app/:id",reviewApplication)

// customer
router.get("/application",authMiddleware,LoanStatus);
router.put("/:id",updateApplication);

export default router;


// GET http://localhost:3000/api/loanapp/loantypes
// POST http://localhost:3000/api/loanapp/apply-loan
// GET http://localhost:3000/api/loanapp/allapplication
// GET http://localhost:3000/api/loanapp/app/:id
// PATCH http://localhost:3000/api/loanapp/:id
// GET http://localhost:3000/api/loanapp/application
