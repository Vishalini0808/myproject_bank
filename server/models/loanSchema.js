import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({

  application: { type: mongoose.Schema.Types.ObjectId, 
    ref: "LoanApplication1" 
},
  sanctionedAmount: Number,
  interestRate: Number,
  startDate: Date,
  endDate: Date,

  loanStatus: {
    type: String,
    enum: ["ACTIVE", "CLOSED"],
    default: "ACTIVE"
  }
});

export default mongoose.model("Loan1",loanSchema);