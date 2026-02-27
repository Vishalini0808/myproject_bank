import LoanType1 from "../models/loanTypeSchema.js"

const getAllLoanTypes = async(req,res) => {

    try {
        const loanTypes = await LoanType1.find();
        res.status(201).json({
            message : " Fetched all loan types " ,
            loanTypes
        });

    } catch (error) {
        res.status(500).json({
            message : "Failed to fetch"
        });
    }
};

export default getAllLoanTypes;