import mongoose from "mongoose";


const connectDB=async()=>{
  try{
    mongoose.connection.on('connected',()=>{console.log("DB connected")})
    await mongoose.connect(`${process.env.MONGODB_URI}/CineElite`)
  }
  catch(e){
    console.log(e.message);
  }
}

export default connectDB
