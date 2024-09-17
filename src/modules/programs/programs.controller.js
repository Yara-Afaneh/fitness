import programModel from './../../../DB/models/programs.model.js';
import cloudinary from "../../ults/cloudinary.js";
import slugify from 'slugify';
import { Apperror } from '../../ults/Apperror.js';

export const get=async(req,res,next)=>{
    const programs=await programModel.find({});
    return next(new Apperror('success',201));
}


export const addProgram=async(req,res,next)=>{
    
    const name=req.body.name;
    if(await programModel.findOne({name})){
        return next(new Apperror('program already exists',409));
    }
    req.body.slug=slugify(req.body.name)
    
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/programs`
    })

    req.body.image={secure_url,public_id};
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;

    

    const program=await programModel.create(req.body)
   
    return next(new Apperror('success',201));
}

export const updateProgram=async(req,res,next)=>{
    
    const program=await programModel.findById(req.params.id);
   
    if(!program){
        return next(new Apperror('program not found',404));
    }
  
    program.name=req.body.name;

    if(await programModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return next(new Apperror('name already exists',409));
    }
    program.slug=slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:'fitness/programs'
        })
          cloudinary.uploader.destroy(program.image.public_id);
          program.image={secure_url,public_id}
  
    }

    program.description=req.body.description;
    program.updatedby=req.user._id
    await program.save();

    return next(new Apperror('success',201));

   
};

export const destroy=async (req, res, next) => {
    const program=await programModel.findByIdAndDelete(req.params.id);

    if(!program){
        return next(new Apperror('no prgram found',404));
    }
    program.updatedby=req.user._id

    await cloudinary.uploader.destroy(program.image.public_id);
    return next(new Apperror('success',201));
}


