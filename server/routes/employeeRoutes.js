import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  { verifyEmployeeRole } from "../middleware/roleMiddleware.js";
import { getMyBranch, getBranchCustomers } from "../controllers/employeeController.js";

const router = express.Router();

// employee access matum
router.get("/mybranch", authMiddleware,verifyEmployeeRole("employee"),getMyBranch);

router.get("/branch/customers", authMiddleware, verifyEmployeeRole("employee"), getBranchCustomers);

export default router;


// http://localhost:3000/api/employee/mybranch
// http://localhost:3000/api/employee/branch/customers