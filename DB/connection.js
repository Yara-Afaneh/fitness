import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log('connectDB')
    }).catch((err)=>{
    console.log(`error in connection : ${err}`)
    })
}

export default connectDB;