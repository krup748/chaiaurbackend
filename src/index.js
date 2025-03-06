// require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants"
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { log } from "console";

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{

    app.on("error",(error) => {
        console.log("ERROR:",error);
        throw error
    })
    

    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is running at port:${process.env.PORT}`);
        
    })
})
.catch((err)=> {
    console.log("MONGODB connection failed !!",err);
    
})


/*
1st way approch
import express from "express"
const app = express()
( async () => {
    try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",(error) => {
        console.log("ERROR:",error);
        throw error
    })

    app.listen(process.env.PORT,() => {
        console.log(`APP is listening on port ${process.env.PORT}`);
        
    })

    } catch (error) {
        console.error("ERROR:",error);
        throw error
    }
})()
*/
