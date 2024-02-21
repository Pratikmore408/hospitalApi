import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.URL;

export const connectToDb = async ()=>{
    try{
        mongoose.connect(url);
        console.log("Connected to mongodb database");
    }catch(err){
        console.log("Error connecting to databse"+ err);
    }
}

