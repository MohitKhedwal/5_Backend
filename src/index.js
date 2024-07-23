// const env =require('dotenv').config({path:"./.env"}) // takes a object which consit of path for env
import dotenv from "dotenv"
dotenv.configDotenv({path:"./.env"})
import connectDB from "./db/index.js"
import express from "express"
const appexpress=express()



import { app } from "./app.js"








// console.log("hello")

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed",err)
})




































// const express =require('express')
// const app=express()
// // using first appexpressroach
// ;(async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)// uses the link and database name
//         console.log("connected to database")
//         appexpress.on("error",(error)=>{
//          console.log("Error",error);
//         })

//         appexpress.listen(process.env.PORT,()=>{
//             console.log(`appexpress is listening on ${process.env.PORT}`)
//         })
//     }catch(e){
//         console.log("Error",e);
//         throw e;

//     }
// })()