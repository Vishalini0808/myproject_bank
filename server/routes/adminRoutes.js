import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {createEmployee, createBranch, createLoanType } from "../controllers/adminController.js";

const router = express.Router();

router.post("/addemployee", authMiddleware,roleMiddleware("admin"), createEmployee);

router.post("/addbranch", authMiddleware, roleMiddleware("admin"),createBranch);

router.post("/addloantype",authMiddleware,roleMiddleware("admin"),createLoanType)

export default router;



// http://localhost:3000/api/admin/addemployee
// http://localhost:3000/api/admin/addbranch
// http://localhost:3000/api/admin/addloantype