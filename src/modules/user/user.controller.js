import userModel from "../../../DB/models/user.model.js"
import { Apperror } from "../../ults/Apperror.js";

export const getUserData=async(req,res,next)=>{
    const user=await userModel.find(req.user._id)
     
    return next(new Apperror('success',201));
    
}

export const updateAcount=async(req,res,next)=>{
    const {userName,password,address,phoneNumber,weight}=req.body;

     const user= await userModel.findById(req.user._id)

     user.userName=userName,
     user.password=password,
     user.address=address,
     user.phoneNumber=phoneNumber,
     user.weight=weight


    await user.save();

return next(new Apperror('success',201));

   
};

