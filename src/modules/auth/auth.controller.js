import userModel from './../../../DB/models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../ults/email.js';
import { customAlphabet } from 'nanoid';
import { Apperror } from '../../ults/Apperror.js';


export const registerUser=async(req,res,next)=>{
   const {userName,email,password,address,phoneNumber,weight,dateOfBirth} = req.body;
   const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
   const newuser=await userModel.create({userName,email,password:hashPass,address,phoneNumber,weight,dateOfBirth});
   if(!newuser){
    return res.status(500).json({message:'error creating user'})
}
   const token=jwt.sign({email},process.env.confirmEmailsig);
 
    await sendEmail(email,'welcome message',userName,token);
   

   return next(new Apperror('success',201));
   

}

export const confirmEmail=async(req, res,next) =>{
    
    const token=req.params.token;
   
    const decoded=jwt.verify(token,process.env.confirmEmailsig)
    await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
    return next(new Apperror('success',201));
}

export const login=async(req,res,next)=>{
    const {email,password}=req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return next(new Apperror('Invalid Email',401));
        
    }

    if(!user.confirmEmail){
        return next(new Apperror('plz confirm your email',400));
        
    }
    const compare =await bcrypt.compare(password,user.password);
     
    if (user.status === 'not_active'){
       
        return next(new Apperror('your account is not active',400));
    }
    if(!compare){
        return next(new Apperror('Invalid password',400));
    }

    const token=await jwt.sign({id:user._id,role:user._role},process.env.LOGINSIGN)
    return res.json({token:token})
}

export const sendCode=async(req,res,next)=>{
     const {email}=req.body;
     const code=customAlphabet('1234567890abcdef',4)();
     const user =await userModel.findOneAndUpdate({email},{sendCode:code},{new:true});

     if(!user){

        return next(new Apperror('email not found',404));
     }

     await sendEmail(email,`reset password`,`<h2>code is ${code}</h2>`)
     return next(new Apperror('success',201));
    
    }

export const forgetPassword= async(req, res,next) => {
    const {email,password,code} = req.body;
    const user= await userModel.findOne({email})
    if(!user){
     
        return next(new Apperror('email not found',409));
    }

    if(user.sendCode!=code){
        return next(new Apperror('invalid code',409));
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    await user.save();
    return next(new Apperror('success',201));
}
