import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register

export const registerCustomer = async (req, res) => {
  try {
    const {
      fullName,dob,gender,phone,email,address,password} = req.body;

      console.log("hi");
      

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      dob,
      gender,
      phone,
      email,
      address,
      password: hashedPassword,
      role: "customer"
    });

    res.status(201).json({
      message: "Customer registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};


// login 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("asd")
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
