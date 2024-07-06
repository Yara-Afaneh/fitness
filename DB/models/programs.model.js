import mongoose, { Schema, Types, model } from 'mongoose';

const programSchema = new Schema({
  programName:{
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
  slug:{
    type:String,
    required:true,
 },
 image:{
   type:Object,
   required:true,
 },
  createdby:{
    type:Types.ObjectId,ref:'admins'
  },

  },{
    timestamps:true,
  }
);


const programModel=model('programs',programSchema);

export default programModel