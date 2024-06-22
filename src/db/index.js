import mongoose  from "mongoose";
import {DB_NAME} from '../constents.js'
const connectDb = async()=>{
    try{
       const connectInsure =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`mongoose is connected !! DB Host ${connectInsure.connection.host}`)
    }catch(err){
        console.log("mongoDB connection failed",err)
        process.exit(1)
    }
}

export default connectDb