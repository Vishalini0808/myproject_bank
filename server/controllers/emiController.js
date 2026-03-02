// import { payEmiService,getEmiService, getOneEmiService } from "../service/emiScheduleSevice.js";
 
// export const payEmi = async (req,res)=>{
//     try{
//         if(req.body.status==="PAID"){
//         const result = payEmiService(req.params.emiId);
//         res.status(200).json({message:"emi paid",...result})
//     }
//     }catch(error){
//         res.status(400).json({error:error.message})
//     }
// }
 
// export const getEmi = async (req,res) => {
//     try{
//         const emis = await getEmiService(req.params.loanId);
//         res.status(200).json(emis);
//     }catch (err){
//         res.status(500).json({error:err.message});
//     }
// }
 
 
// export const getOneEmi = async (req,res) => {
//     try{
//         console.log(req.params.emiId)
//         const emi = await getOneEmiService(req.params.emiId);
//         res.status(200).json(emi);        
//     }catch (err){
//         res.status(500).json({error:err.message});
//     }
// }