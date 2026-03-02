import LoanApplication1 from '../models/loanApplicationSchema.js'
import { updateApplicationStatus } from '../service/loanappService.js';

export const LoanStatus = async (req, res) => {
    try {
        // console.log(req.user)
        const application  = await LoanApplication1.find({user:req.user.id})
             .populate("loanType", "name")
             .populate ("branch","branchName")
        
        res.json({application});
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Database error" });
    }
};

 

export const updateApplication = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await updateApplicationStatus(id, req.body);

    res.status(200).json({
      message: "Application status updated",
      data: result
    });

  } catch (error) {

    if (error.message === "INVALID_STATUS") {
      return res.status(400).json({ message: "Invalid Status" });
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      return res.status(404).json({ message: "Application not found" });
    }

    if (error.message === "SANCTION_DETAILS_REQUIRED") {
      return res.status(400).json({ message: "Sanction details required" });
    }

    res.status(500).json({ message: "Database error" });
  }
};
