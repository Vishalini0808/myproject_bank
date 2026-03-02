import LoanApplication1 from "../models/loanApplicationSchema.js";
import Loan1 from "../models/loanModel.js";
import {loanEventEmitter} from "../event/loanEvent.js";
 
 
// export const createApplication = async (data) => {
//     return await LoanApplication1.create(data);
// };
 
// export const getAllApplications = async () => {
//     return await LoanApplication1.find();
// };
 
// export const getApplicationById = async (id) => {
//     return await LoanApplication1.findById(id);
// };
 
// export const getApplicationByUserId = async (id) => {
//     return await LoanApplication1.find({user:id});
// };
 
 
 
export const updateApplicationStatus = async (id, loanData) => {
    const status =loanData.status;
    if (!["APPROVED", "REJECTED"].includes(status)) {
        throw new Error("INVALID_STATUS");
    }
    const application = await LoanApplication1.findById(id);
   
    if (!application) {
        throw new Error("APPLICATION_NOT_FOUND");
    }
 
    application.status = status;
    await application.save();
    
   
    let loan = null;
 
    if (status==="APPROVED") {
        if (!loanData) throw new Error("LOAN_DATA_REQUIRED");
                  
        loan = await Loan1.create({
            LoanApplication1: application._id,
            name: application.name,
            account_number: application.account_number,
            branch: application.branch,
            SanctionedAmount: loanData.SanctionedAmount,
            InterestRate: loanData.InterestRate,
            Duration:loanData.duration,
            LoanStatus: "ACTIVE"
        });
       
    
        loanEventEmitter.emit("loan_created",loan);
    }
    return { application, loan };
};