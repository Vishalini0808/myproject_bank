import Account1 from "../models/bankAccountSchema.js";
import Branch1 from "../models/branchSchema.js";


export const addBankAccount = async (req, res) => {
  try {
    const { accountHolderName, accountNumber, accountType, branchId } = req.body;

    if(!accountHolderName || !accountNumber || !accountType || !branchId) {

      return res.status(400).json({ message : "All fields are required"});
    }

    const branch = await Branch1.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const existingAccount = await Account1.findOne({ accountNumber });

    if (existingAccount) {
      return res.status(400).json({ message: "Account number already exists" });
    }

    const newAccount = await Account1.create({
      accountHolderName,
      accountNumber,
      accountType,
      balance:  0,
      customer: req.user.id,
      branch: branch._id
    });

    res.status(201).json({
      message: "Bank account added successfully",
      account: newAccount
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to add bank account" });
  }
};


export const getMyAccounts = async (req, res) => {
  try {
    const accounts = await Account1.find({ customer: req.user.id })
      .populate("branch", "branchName city ifscCode");

    res.json({ accounts });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};


