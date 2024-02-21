import mongoose from "mongoose";

export const DoctorSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:String,
    contactNumber:Number,
    // reports:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Report'
    //     }
    // ],

})