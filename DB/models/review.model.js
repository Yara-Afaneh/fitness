import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const reviewSchema = new Schema({

  comment:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
  },
  userId:{
    type:Types.ObjectId,
    required:true,
    ref:'user',
  },
  programId:{
    type:Types.ObjectId,
    required:true,
    ref:'programs',
  }},
  {
    timestamps:true,
  }
 
)
 


const reviewModel=model('review',reviewSchema);

export default reviewModel;