import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import routerPage from "./routes/authRoutes.js"
import cors from "cors";
import adminRoutepage from "./routes/adminRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import branchRoutes from "./routes/branchRoutes.js"
import loanApplicationRoutes from "./routes/loanApplicationRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

//route api
app.use("/api",routerPage);
app.use("/api/admin",adminRoutepage);
app.use("/api/employee", employeeRoutes);
app.use("/api/customer",customerRoutes)
app.use("/api/branch",branchRoutes)
app.use("/api/loanapp",loanApplicationRoutes)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running succesfully on port http://localhost:${PORT}`);
});


//endpoints:
// POST http://localhost:3000/api/auth/register
// POST http://localhost:3000/api/auth/login

// POST http://localhost:3000/api/admin/addemployee
// POST http://localhost:3000/api/admin/addbranch

