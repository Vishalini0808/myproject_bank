// import LoanApplication1 from "../models/loanApplicationSchema.js";
// import LoanType1 from "../models/loanTypeSchema.js";
// import Branch1 from "../models/branchSchema.js";
// import Account1 from "../models/bankAccountSchema.js";

// // export const getAllLoanTypes = async (req, res) => {
// //   try {
// //     const loanTypes = await LoanType1.find();
// //     res.json({ loanTypes });
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to fetch loan types" });
// //   }
// // };



// export const createLoanApplication = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       user: req.user.id,
//       documents: {
//         proof: req.files?.proof?.[0]?.path || null,
//       },
//     };

//     const account = await Account1.findOne({
//         accountNumber : data.accountNumber,
//         user : req.user.id
//     });

//     if(!account) {
//         return res.status(400).json({message : "Wrong account number"})
//     }


//     const loanType = await LoanType1.findById(data.loanType);
//     if (!loanType) return res.status(404).json({ message: "Loan type not found" });


//     data.requestedAmount = Number(data.requestedAmount);

//     if (data.requestedAmount > loanType.maxAmount)
//       return res.status(400).json({ message: `Amount exceeds max limit of ${loanType.maxAmount}` });


//     const branch = await Branch1.findById(data.branch);
//     if (!branch) return res.status(404).json({ message: "Branch not found" });

//     const application = await LoanApplication1.create(data);

//     res.status(201).json({
//       message: "Loan application submitted successfully",
//       application,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create loan application" });
//   }
// };



// export const getMyApplications = async (req, res) => {
//   try {
//     const applications = await LoanApplication1.find({ user: req.user.id })
//       .populate("loanType", "name maxAmount baseInterestRate tenureYears")
//       .populate("branch", "branchName city ifscCode");

//     res.json({ applications });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch applications" });
//   }
// };



// export const getAllApplications = async (req, res) => {
//   try {
//     const applications = await LoanApplication1.find()
//       .populate("user", "fullName email")
//       .populate("loanType", "name maxAmount baseInterestRate tenureYears")
//       .populate("branch", "branchName city ifscCode");
//     res.json({ applications });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch applications" });
//   }
// };



// export const updateApplicationStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!["PENDING", "APPROVED", "REJECTED"].includes(status))
//       return res.status(400).json({ message: "Invalid status" });

//     const application = await LoanApplication1.findById(id);
//     if (!application) return res.status(404).json({ message: "Application not found" });

//     application.status = status;
//     await application.save();

//     res.json({ message: "Application status updated", application });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update status" });
//   }
// };
