import mongoose from "mongoose";

const loanApprovalSchema = new mongoose.Schema({
  application: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "LoanApplication1" 
},
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Employee1" 
},
  approvalDate: Date,

  approvalStatus: {
    type: String,
    enum: ["APPROVED", "REJECTED"]
  },
  remarks: String
});

export default mongoose.model("LoanApproval1",loanApprovalSchema);