import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userSchema.js"; 

dotenv.config();

const seedAdmin = async () => {
  try {
    
    await mongoose.connect(process.env.Mongo_URL);
    console.log("Database connected");

    
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    
    const hashedPassword = await bcrypt.hash("adminpass", 10); 

    // seeding admin
    const admin = await User.create({
      fullName: "Admin1",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully:", admin);
    process.exit();

  } catch (error) {
    console.log("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
