import mongoose, { Schema, Types, model } from 'mongoose';

const classSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  numberOfExercise:{
    type:Number,
    required:true,
  },
  slug:{
    type:String,
    required:true,
 },
 programId:{
  type:Types.ObjectId,
  required:true,
  ref:'programs'
  
},
  createdby:{
    type:Types.ObjectId,ref:'admins'
  },
  updatedby:{
    type:Types.ObjectId,ref:'admins'
  },

  },{
    timestamps:true,
  }
);


const classModel=model('class',classSchema);

export default classModel