import mongoose from "mongoose"

// const mongoose = require('mongoose');

const connectDB = async()=>{
    try {        
        const conn = await mongoose.connect(process.env.Mongo_URL);
        console.log("DB connected Successfully");
        
    } catch (error) {
        console.error("Failed to connect DB");
        
    }
}

// module.exports = connectDB;
export default connectDB;