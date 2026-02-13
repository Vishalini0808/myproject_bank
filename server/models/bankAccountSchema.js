
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountHolderName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true
    },

    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      required: true
    },

    balance: {
      type: Number,
      default: 0
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User1",
      required: true
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch1",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Account1", accountSchema);
