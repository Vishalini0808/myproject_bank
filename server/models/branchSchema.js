
import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    branchID: {
      type: String,
      required: true,
      unique: true
    },

    branchName: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    ifscCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Branch1", branchSchema);
