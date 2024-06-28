// import mongoose from 'mongoose'
// import {DB_NAME} from 'constants'
// import express from 'express'
// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

console.log(process.env.PORT)

connectDB()
.then(() => {
  const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

/* 
const app = express()
( async()=>{
    try{
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      app.on("error",(error)=>{
        console.log(error)
        throw error
      })
      app.listen(process.env.PORT, ()=>{
        console.log(`app is listen ${process.env.PORT}`)
      })
    }catch(error){
        console.log("ERROR",error)
        throw error
    }
})()
     */