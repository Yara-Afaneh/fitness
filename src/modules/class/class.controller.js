
import slugify from 'slugify';
import classModel from '../../../DB/models/class.model.js';
import programModel from './../../../DB/models/programs.model.js';



export const get=async(req,res)=>{

    const classes=await classModel.find({});
    return res.status(200).json(classes);
}

export const addClass=async(req,res,next)=>{
    
    const {programId}=req.body;
      const programs=await programModel.findById(programId);

    if(!programs){
        return res.status(404).json({message: 'No program found'})
    }
 
    const name=req.body.name.toLowerCase();
    if(await classModel.findOne({name})){
        return res.status(409).json({message:'class already exists'})
    }
    req.body.slug=slugify(req.body.name);
    req.body.createdby=req.user._id;
    req.body.updatedby=req.user._id;

    const classes=await classModel.create(req.body)
   
   return res.json({message: classes});
};

export const updateClass=async(req,res,next)=>{
    
    const classes=await classModel.findById(req.params.id);
   
    if(!classes){
        return res.status(404).json({message:'class not found'});
    }
  
    classes.name=req.body.name.toLowerCase();

    if(await classModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:'name already exists'})
    }
    classes.slug=slugify(req.body.name);

     classes.numberOfExercise=req.body.numberOfExercise;
     classes.updatedby=req.user._id

    await classes.save();

    return res.json({message:'Success',classes})

   
};

export const destroy=async (req, res, next) => {
    const classes=await classModel.findByIdAndDelete(req.params.id);

    if(!classes){
        return res.status(404).json({message:'No class found'})
    }
    classes.updatedby=req.user._id

    return res.status(200).json({message:'success',classes})
}


