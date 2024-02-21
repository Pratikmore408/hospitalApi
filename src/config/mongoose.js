import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// get password from env file
const dbPassword = process.env.DB_PASSWORD;

// encode the password
const encodedPassword = encodeURIComponent(dbPassword);

// url for mongodb Atlas
const url = `mongodb+srv://pratikmore408:${encodedPassword}@cluster0.bibaswd.mongodb.net/hospitalAPI?retryWrites=true&w=majority`;

export const connectToDb = async ()=>{
    try{
        // connect to mongodb using mongoose
        mongoose.connect(url);
        console.log("Connected to mongodb database");
    }catch(err){
        console.log("Error connecting to databse"+ err);
    }
}

