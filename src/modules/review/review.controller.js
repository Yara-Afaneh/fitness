import reviewModel from '../../../DB/models/review.model.js';
import { Apperror } from '../../ults/Apperror.js';
import registrationModel from './../../../DB/models/registration.model.js';

export const get=async(req,res,next)=>{
    const programId=req.params.id;
    const reviews=await reviewModel.find({programId:programId});
     
    if (reviews.length === 0) {
        return next(new Apperror('no reviews found',404));
    }
    return next(new Apperror('success',201));
}
    

export const addreview=async(req,res,next)=>{

    const programId=req.params.id;
    const {comment,rating}=req.body;

    const register=await registrationModel.findOne({
        userId: req.user._id,
        "program.programId":programId,
    });

   

    if(!register){
        return next(new Apperror('No program found',409));
    }

    const checkreview=await reviewModel.findOne({
        userId: req.user._id,
        programId: programId,
    });

    if(checkreview){
        return next(new Apperror('review already exists',409));
    }

    const review=await reviewModel.create({
        comment,rating,programId,userId:req.user._id
    })
    return next(new Apperror('success',201));
}