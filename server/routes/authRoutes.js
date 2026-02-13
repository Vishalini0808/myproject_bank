import express from "express";
import { registerCustomer, loginUser } from "../controllers/authController.js";

const router = express.Router();
console.log("ad");

router.post("/auth/register", registerCustomer);
router.post("/auth/login", loginUser);

export default router;




// http://localhost:3000/api/auth/register
// http://localhost:3000/api/auth/login