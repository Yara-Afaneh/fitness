import slugify from "slugify";
import exerciseModel from "../../../DB/models/exercises.model.js";
import cloudinary from "../../ults/cloudinary.js";
import classModel from './../../../DB/models/class.model.js';



export const get=async(req,res)=>{

    const exercise=await exerciseModel.find({});
    return res.status(200).json(exercise);
}

export const addExersise=async(req,res,next)=>{
    
    const {classId}=req.body;
      const classes=await classModel.findById(classId);

    if(!classes){
        return res.status(404).json({message: 'No class found'})
    }
 
    const name=req.body.name.toLowerCase();
    if(await exerciseModel.findOne({name})){
        return res.status(409).json({message:'exercise already exists'})
    }
    req.body.slug=slugify(req.body.name)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/exercises`
    })

    req.body.image={secure_url,public_id};
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;

    const exercise=await exerciseModel.create(req.body)
   
   return res.json({message: exercise});
}

export const updateExercise=async(req,res,next)=>{
    
    const exercise=await exerciseModel.findById(req.params.id);
   
    if(!exercise){
        return res.status(404).json({message:'exercise not found'});
    }
  
    exercise.name=req.body.name.toLowerCase();

    if(await exerciseModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:'name already exists'})
    }
    exercise.slug=slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APPNAME}/exercises`
        })
          cloudinary.uploader.destroy(exercise.image.public_id);
          exercise.image={secure_url,public_id}
  
    }

    exercise.duration=req.body.duration;
    exercise.description=req.body.description;
    exercise.updatedby=req.user._id
    await exercise.save();

    return res.json({message:'Success',exercise})

   
};

export const destroy=async (req, res, next) => {
    const exercise=await exerciseModel.findByIdAndDelete(req.params.id);

    if(!exercise){
        return res.status(404).json({message:'No exercise found'})
    }
    exercise.updatedby=req.user._id

    await cloudinary.uploader.destroy(exercise.image.public_id);
    return res.status(200).json({message:'success',exercise})
}


