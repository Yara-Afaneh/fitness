import mongoose, { Schema, Types, model } from 'mongoose';

const userSchema = new Schema({
  userName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
    
  },
  confirmEmail:{
    type:Boolean,
    default:false,
  },
  gender:{
    type:String,
    enum:['male','female']
  },
  status:{
    type:String,
    default:'active',
    enum:['active','not_active']
  },
  sendCode:{
    type:String,
    default:null,
  },
  phoneNumber:{
    type:String,
    required:true
  },
  weight:{
    type:String,
    required:true
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  role:{
    type:String,
    default:'user',
    enum:['admin','user','superadmin']
  },
  updatedby:{
    type:Types.ObjectId,ref:'users'
  }
  },{
    timestamps:true,
  }
);


const userModel=model('users',userSchema);

export default userModel