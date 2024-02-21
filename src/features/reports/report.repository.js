import mongoose from "mongoose";
import { ReportSchema } from "./report.schema.js";
import { ObjectId } from "mongodb";
import { PatientSchema } from "../users/patients/patients.schema.js";


const ReportModel = mongoose.model('Report', ReportSchema);
const PatientModel = mongoose.model('Patient', PatientSchema);


export default class ReportRepository {
    
    // async create(docname, status ,patientID){
    //     try{
    //         const newReport = new ReportModel({
    //             patients : patien,
    //             doctor: docname,
    //             status: status,
    //             date: new Date().toISOString()
    //         });

    //         const savedReport =  await newReport.save();

    //         await PatientModel.updateMany(
    //             {$push : {reports: new ObjectId(savedReport._id)}}
    //         );

    //         return savedReport;

    //     }catch(err){
    //         console.log('error in creating report' + err);
    //     }
    // }

    async getAllReports(status){
        try{
            const allReport = await ReportModel.find({status: status});
            console.log(allReport);
            return allReport
        }catch(err){
            console.log('error in creating report' + err);
        }
    }

    
}