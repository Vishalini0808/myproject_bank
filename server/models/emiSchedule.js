import mongoose from "mongoose";

const emiSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan1" },
  emiAmount: Number,
  dueDate: Date,
  emiStatus: {
    type: String,
    enum: ["PAID", "PENDING", "LATE"],
    default: "PENDING"
  }
});
