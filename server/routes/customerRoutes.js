import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  { verifyCustomerRole } from "../middleware/roleMiddleware.js";
import { addBankAccount, getMyAccounts } from "../controllers/customerController.js";

const router = express.Router();

// Only customer can access
router.post("/add/bankaccount",authMiddleware,verifyCustomerRole("customer"),addBankAccount);
router.get("/my/accounts",authMiddleware,  verifyCustomerRole("customer"), getMyAccounts);


export default router;


// http://localhost:3000/api/customer/add/bankaccount
// http://localhost:3000/api/customer/my/accounts
