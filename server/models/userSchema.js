import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName : {
        type : String,
        required : true
    },
    dob : Date,
    gender : String,
    phone : String,
    address : String,

    email : {
        type: String, 
        required :true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type : String,
        enum: ["admin","employee","customer"],
        required : true
    },

    // employees ku
    employeeRole : String,

    branch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Branch1"
    },

    // customers ku
    kycStatus : {
        type : String,
        default : "Pending"
    }
},
{ timestamps : true }
)

export default mongoose.model("User1",userSchema);

