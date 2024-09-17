import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const registrationSchema = new Schema({
   userId:{
    type:Types.ObjectId,
    ref:'user',
    required:true,
   },
   date:{
      type:Date,
   },
   program:[{
      name:{type:String},
      programId:{type:Types.ObjectId,ref:'programs',required:true},
      price:{type:Number,required:true},
   }],
  },{
    timestamps:true,
  }
 
)

const registrationModel=model('registration',registrationSchema);

export default registrationModel;