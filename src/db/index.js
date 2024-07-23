// import mongoose, { connect } from "mongoose";
// import { DB_Name } from "../constants.js";



// const connectDB=async()=>{
//     try{
//         const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
//         console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`) // helps to know to whom host i have connected
//     }catch(error){
//         console.log("Error Occured Connection FAILED",error);
//         process.exit(1);
//     }
// }
// export  default connectDB;

import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB