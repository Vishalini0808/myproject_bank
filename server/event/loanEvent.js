import EventEmitter from "events";
import {generateInterestSchedule} from "../service/emiScheduleSevice.js";
import EmiModel from "../models/EmiModel.js";
 
export const loanEventEmitter = new EventEmitter();
 
loanEventEmitter.on("loan_created", async(loan)=>{
    const {InterestRate,SanctionedAmount,Duration} = loan;
    const schedule = generateInterestSchedule(InterestRate,SanctionedAmount,Duration,loan._id.toString());
    await EmiModel.insertMany(schedule);
})