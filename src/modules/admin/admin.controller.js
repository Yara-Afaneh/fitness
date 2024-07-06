import userModel from "../../../DB/models/user.model.js"
import { Apperror } from "../../ults/Apperror.js";
import adminModel from './../../../DB/models/admin.model.js';


export const getAll=async(req,res,next)=>{
    const users=await userModel.find({});
    return res.status(200).json({message:'success',users})
}

export const addAdmin=async(req,res,next)=>{

    const user=await userModel.findById(req.params.id)
    if(!user){
        return next(new Apperror('user not found',404));
    }
    if(user.role=='superadmin'){
        return next(new Apperror('can not change super admins roles',409));
    }
    if(user.role=='admin'){
        return next(new Apperror('user already admin',409));
    }

    user.role='admin';
    user.updatedby=req.user._id

    await user.save();

    const admin=await adminModel.create({userName:user.userName,email:user.email,password:user.password,address:user.address,phoneNumber:user.phoneNumber,role:'admin'});
    
    return next(new Apperror('success',201));
   

   
};

export const updateAdmin=async(req,res,next)=>{
    const {status}=req.body;
     const admin= await adminModel.findById(req.params.id);
     if(!admin){
        return next(new Apperror('admin not found',404));
      }
     if(admin.status==status){
        return next(new Apperror(`status already ${status}`,409));
     }
     
      admin.status=status;
      await admin.save();

    return res.json({message:'Success',admin})

   
};

export const deleteAdmin=async(req,res,next)=>{
     const admin= await adminModel.findByIdAndDelete(req.params.id);
     if(!admin){
        return next(new Apperror('admin not found',404));
      }

      const user=await userModel.findOne({email:admin.email});
       user.role='user'

       await user.save();

    return res.json({message:'Success',user})

   
};

