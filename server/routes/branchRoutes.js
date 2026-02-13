import express from "express";
import { getAllBranches } from "../controllers/branchController.js";

const router = express.Router();

router.get("/",getAllBranches);

export default router;


// http://localhost:3000/api/branch/