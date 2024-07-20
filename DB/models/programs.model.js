
import mongoose, { Schema, Types, model } from 'mongoose';

const programSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  slug:{
    type:String,
    required:true,
  
 },
  duration:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
 image:{
   type:Object,
   required:true,
 },
 price:{
  type:Number,
  required:true,
 },
  createdby:{
    type:Types.ObjectId,ref:'admins'
  },
  updatedby:{
    type:Types.ObjectId,ref:'admins'
  },

},{
  timestamps:true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
},

);
programSchema.virtual('class',{
localField:'_id',
foreignField:'programId',
ref:'class'
})
;


const programModel=model('programs',programSchema);

export default programModel