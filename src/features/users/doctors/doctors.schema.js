import mongoose from "mongoose";

// create doctor schema
export const DoctorSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:String,
    contactNumber:Number,
})