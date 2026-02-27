import LoanApplication1 from '../models/loanApplicationSchema.js'
import loanType1 from '../models/loanTypeSchema.js'

const createLoanApp = async(req,res) => {

   try {
    
       // console.log(req.body);
    
     const data = {...req.body,
        user : req.user.id,
        // requestedAmount : Number(req.body.requestedAmount),
        documents : {
            proof : req.files?.proof?.[0]?.path || null,

        },

    };

    // const loantype = await loanType1.findById(data.loanType);
    

    const application = await LoanApplication1.create(data);

    res.status(201).json({
        message : "Loan application craeted",
        application
    });
   } catch (error) {
  console.log("FULL ERROR:", error);
  res.status(500).json({
    message: error.message,
  });
}

};



export const getAllApplications = async (req, res) => {
  try {
    const applications = await LoanApplication1.find()
      .populate("user","fullName email")
      .populate("loanType", "name maxAmount baseInterestRate tenureYears")
      .populate("branch", "branchName city ifscCode");

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};



export default createLoanApp;

