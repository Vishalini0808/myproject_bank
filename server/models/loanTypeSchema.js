import mongoose from "mongoose";

const loanTypeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
}, 
  maxAmount: { 
    type: Number, 
    required: true 
},
  baseInterestRate: { 
    type: Number, 
    required: true 
}, 
  tenureYears: { 
    type: Number, 
    required: true 
}, 
});

export default mongoose.model("LoanType1", loanTypeSchema);
