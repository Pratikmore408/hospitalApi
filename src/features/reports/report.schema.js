import mongoose from "mongoose";

export const ReportSchema = mongoose.Schema({
    patients:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ],
    doctor: String,
    status:{
        type: String,
        enum:["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]
    },

    date: Date
});