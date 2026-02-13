import User1 from "../models/userSchema.js";
import Branch1 from "../models/branchSchema.js";
import bcrypt from "bcryptjs";



export const createEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      employeeRole,
      branchId
    } = req.body;

    const existingUser = await User1.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await User1.create({
      fullName,
      email,
      password: hashedPassword,
      role: "employee",
      employeeRole,
      branch: branchId
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create employee" });
  }
};




export const createBranch = async (req, res) => {
  try {
    const { branchName, city, ifscCode } = req.body;

    const existingBranch = await Branch1.findOne({ ifscCode });

    if (existingBranch) {
      return res.status(400).json({ message: "IFSC already exists" });
    }

    const branchID = `BR-${Date.now()}`
    const branch = await Branch1.create({
        branchID,
      branchName,
      city,
      ifscCode
    });

    res.status(201).json({
      message: "Branch created successfully",
      branch
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create branch" });
  }
};
