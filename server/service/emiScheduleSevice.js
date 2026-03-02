import EMISchema1 from "../models/EmiModel.js";
import Loan1 from "../models/loanModel.js";
export const generateInterestSchedule = (interestRate,amount,tenureMonths,loanid) => {
    const R = interestRate;
    const N = tenureMonths;
    const P = amount;
 
    const emiamount = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
    let balance  = P;
    const emis=[];
    for(let i =1;i<=N;i++){
        const  interest = balance*R;
        const principal = emiamount - interest;
        balance -= principal;
        const duedate = new Date();
        duedate.setMonth(duedate.getMonth()+i);
        emis.push({
            loanId:loanid,
            principal: principal,
            installementNumber:i,
            dueDate:duedate,
            Interest:interest,
            totalAmout:emiamount,
            status:"PENDING"
        })
    }
 return emis;
};
 
export const  calculatePenalty =(duedate,emiAmount)=>{
    const rate=1;
    const  today = new Date();
    if(today <= duedate)return 0;
    const lateDays = Math.ceil ((today-duedate)/(1000*60*60*24));
    return Number (((emiAmount*rate*lateDays)/100).toFixed(2));
}
 
 
export const payEmiService= async (EmiId)=>{
    const emi= await EMISchema1.findById(EmiId);
    if(!emi)throw new Error ("Emi not found");
    emi.status="PAID";
    await emi.save();
    return {
        totalPaid: emi.totalAmout+emi.penalty,
    };
};
 
export const getEmiService = async(loanId)=>{    
    const loan= await Loan1.findOne({loanApplicationId:loanId});
    const emis = await EMISchema1.find({loanId:loan._id})
    // return emis.map((emi)=>{
    //     if(emi.status==="PENDING")
    //     {
    //         const penalty = calculatePenalty(emi.dueDate,emi.totalAmout);
    //         return {...emi.toObject(),penalyAmount:penalty};
    //     }return emi
    // })
    return emis;
}
 
export const getOneEmiService = async(EmiId)=>{
    const emis = await EMISchema1.findById(EmiId);
      if (!emis) throw new Error("EMI_NOT_FOUND");
    const  penalty = calculatePenalty(emis.dueDate,emis.totalAmout);
    emis.penalty = penalty;
    // return emis.map((emi)=>{
    //     if(emi.status==="PENDING")
    //     {
    //         const penalty = calculatePenalty(emi.dueDate,emi.totalAmout);
    //         return {...emi.toObject(),penalyAmount:penalty};
    //     }return emi
    // })
    return emis;
}