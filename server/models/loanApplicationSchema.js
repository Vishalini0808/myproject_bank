import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User1", 
    required: true },
  loanType: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "LoanType1", 
    required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, 
    ref: "Branch1", 
    required: true },
  account_number: { 
    type: String, 
    required: true },
  requestedAmount: { 
    type: Number, 
    required: true },
  address: { 
    type: String, 
    required: true },
  status: { 
    type: String, 
    enum: ["PENDING", "APPROVED", "REJECTED"], 
    default: "PENDING" },
  documents: {
    proof: String, 
  },
  applicationDate: { 
    type: Date, 
    default: Date.now },
});

export default mongoose.model("LoanApplication1", loanApplicationSchema);
