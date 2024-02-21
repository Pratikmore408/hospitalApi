import mongoose from "mongoose";

// define patient schema
 export const PatientSchema = mongoose.Schema({
    name:String,
    contactNumber:{type: String, required:true, unique: true},
    age: Number,
    gender: String,
    reports:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
});

