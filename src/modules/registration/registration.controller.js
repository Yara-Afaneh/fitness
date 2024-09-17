import registrationModel from "../../../DB/models/registration.model.js";
import { Apperror } from "../../ults/Apperror.js";
import programModel from './../../../DB/models/programs.model.js';



export const get=async(req,res,next)=>{

    const registrations=await registrationModel.find({userId:req.user._id});
    return res.status(200).json(registrations);
}

export const addregistration=async(req,res,next)=>{
    
    const {id}=req.params;
    const date= req.body.date;
  
      const program=await programModel.findById(id);
    if(!program){
        return next(new Apperror('no program found',404));
    }
    const checkRegister = await registrationModel.findOne({
        userId: req.user._id,
        'program.programId':id,
    });

    if(checkRegister){
        return res.status(400).json({ message:'program already register' });
    }
    const checkDate = await registrationModel.findOne({
        userId: req.user._id,
       date:date
    });
  
    if(checkDate){
        return res.json({ message:'cant register 2 programs at the same time' });
    }

      const registration = await registrationModel.create({
        userId: req.user._id,
        program: {
            programId: program._id,
            name: program.name,
            price: program.price
        },
        date:date
    });
   
 
    return next(new Apperror('success',201));
}

export const destroy=async (req, res, next) => {
    const registration=await registrationModel.findByIdAndDelete(req.params.id);

    if(!registration){
        return next(new Apperror('no exercise found ',404));
    }
    registration.updatedby=req.user._id
    return next(new Apperror('success',201));
}


