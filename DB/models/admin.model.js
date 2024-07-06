import mongoose, { Schema, Types, model } from 'mongoose';

const adminSchema = new Schema({
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
  role:{
    type:String,
    default:'admin',
    enum:['admin','superadmin']
  },
  updatedby:{
    type:Types.ObjectId,ref:'admins'
  }
  },{
    timestamps:true,
  }
);


const adminModel=model('admins',adminSchema);

export default adminModel