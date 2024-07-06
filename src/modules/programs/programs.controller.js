import programModel from './../../../DB/models/programs.model.js';

export const get=async(req,res)=>{

    return res.json('programs')
}

export const addProgram=async(req,res,next)=>{
    const programName=req.body.name.toLowerCase();
    if(await programModel.findOne({programName})){
        return res.status(409).json({message:'program already exists'})
    }
    req.body.slug=slugify(req.body.name)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/programs`
    })

    req.body.image={secure_url,public_id};
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;

    

    const program=await programModel.create(req.body)
   
   return res.json({message: program});
}

export const updateProgram=async(req,res,next)=>{
    
    const program=await programModel.findById(req.params.id);
   
    if(!program){
        return res.status(404).json({message:'program not found'});
    }
  
    program.programName=req.body.name.toLowerCase();

    if(await programModel.findOne({programName:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:'name already exists'})
    }
    program.slug=slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:'fitness/programs'
        })
          cloudinary.uploader.destroy(program.image.public_id);
          program.image={secure_url,public_id}
  
    }

    program.status=req.body.status;
    program.updatedBy=req.user._id
    await program.save();

    return res.json({message:'Success',program})

   
};
