import User1 from "../models/userSchema.js";
// import Branch1 from "../models/branchSchema.js";
import Account1 from "../models/bankAccountSchema.js";


export const getMyBranch = async (req, res) => {
  try {
    const employee = await User1.findById(req.user.id).populate("branch");

    if (!employee || !employee.branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ branch: employee.branch });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch branch" });
  }
};

export const getBranchCustomers = async (req, res) => {
  try {
    const employee = await User1.findById(req.user.id);

    if (!employee || !employee.branch) {
      return res.status(404).json({ message: "Branch not assigned" });
    }


    // all bank accounts in this branch
    const accounts = await Account1.find({ branch: employee.branch })
      .populate("customer", "fullName email phone kycStatus");

    res.json({ customers: accounts });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};
