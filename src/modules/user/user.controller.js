import userModel from "../../../DB/models/user.model.js"

export const getUserData=async(req,res)=>{
    const user=await userModel.find(req.user._id)
     
    return res.status(201).json({message:'Success',user})
    
}

// export const updateAcount=async(req,res,next)=>{
//     const {userName,password,address,phoneNumber,weight}=req.body;
//      const user= await userModel.findOneAndUpdate({userId: req.user._id},
//     {userName:req.user.userName},
//     {password:req.user.password},
//     {address:req.user.address},
//     {phoneNumber:req.user.phoneNumber},
//     {weight:req.user.weight}
// )
//     await user.save();

//     return res.json({message:'Success',user})
// return next(new Apperror('success',201));

   
// };

