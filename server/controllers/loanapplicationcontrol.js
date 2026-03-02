import LoanApplication1 from '../models/loanApplicationSchema.js'


const createLoanApp = async(req,res) => {

   try {
       const {
        loanType,
        branch,
        account_number,
        requestedAmount,
        address,
        monthlyIncome
       } = req.body;

       if(!requestedAmount || ! monthlyIncome){
        return res.status(400).json({
            message: "Income and ReqAmount are required"
        });
       }

        const application = await LoanApplication1.create({
            user : req.user.id,
            loanType,
            branch,
            account_number,
            address,
            requestedAmount : Number(requestedAmount),
            monthlyIncome : Number(monthlyIncome),
            documents : {
            proof : req.files?.proof?.[0]?.path || null,
        }
        });

    res.status(201).json({
        message : "Loan application craeted",
        application
    });
   } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({
    message: error.message,
  });
};

};




export const getAllApplications = async (req, res) => {
  try {
    //  console.log("reached try block");

    const applications = await LoanApplication1.find()
      .populate("user","fullName email cibilScore creditHistory")
      .populate("loanType", "name maxAmount baseInterestRate tenureYears")
      .populate("branch", "branchName city ifscCode");

    //   console.log("hi ");
      
    res.json({ applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        message: "Failed to fetch applications" });
  }
};


export const reviewApplication = async (req, res) => {
    try {
        // console.log("try block");
        const application = await LoanApplication1.findById(req.params.id)
            .populate("user","fullName email phone address cibilScore creditHistory")
            .populate("loanType","name maxAmount baseInterestRate tenureYears")
            .populate("branch", "branchName city ifscCode");
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(application);
    } catch (error) {
        console.log(error);
        // console.log("hi");

        res.status(500).json({ message: "Failed to load Application" });
    }
};
 



export default createLoanApp;

