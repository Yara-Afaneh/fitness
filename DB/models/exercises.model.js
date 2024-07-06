import mongoose, { Schema, Types, model } from 'mongoose';

const exerciseSchema = new Schema({
  exerciseName:{
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
 classId:{
  type:Types.ObjectId,
  required:true,
  ref:'class'
  
},
  createdby:{
    type:Types.ObjectId,ref:'admins'
  },

  },{
    timestamps:true,
  }
);


const exerciseModel=model('exercises',exerciseSchema);

export default exerciseModel