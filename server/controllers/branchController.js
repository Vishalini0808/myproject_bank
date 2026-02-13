import Branch1 from "../models/branchSchema.js";



export const getAllBranches = async(req,res)=> {
  try {
    const branches = await Branch1.find();
    res.json({branches})
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch branches" });
  }
};