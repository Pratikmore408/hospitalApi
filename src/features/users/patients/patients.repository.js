import mongoose from "mongoose";
import { PatientSchema } from "./patients.schema.js";
import { DoctorSchema } from "../doctors/doctors.schema.js";
import {ReportSchema} from "../../reports/report.schema.js";
import { ObjectId } from 'mongodb';



const PatientModel = mongoose.model('Patient', PatientSchema);
const DoctorModel = mongoose.model('Doctor', DoctorSchema);
const ReportModel = mongoose.model('Report', ReportSchema);

export default class PatientRepository{
    async register(user){
        try{
            const existingUser = await PatientModel.findOne(user);
            if(!existingUser){
                const newUser =  new PatientModel(user);
                await newUser.save();
                return newUser;
            }else{
                return existingUser;
            }
            
        }catch(err){
            console.log("error in saving patient"  + err);
            throw err
        }
    }

    async create(userID, status ,patientID){
        const doctor = await DoctorModel.findById(userID);
        try{
            const newReport = new ReportModel({
                patients : new ObjectId(patientID),
                doctor: doctor.name,
                status: status,
                date: new Date().toISOString()
            });

            const savedReport =  await newReport.save();

            await PatientModel.updateMany(
                {$push : {reports: new ObjectId(savedReport._id)}}
            );

            return savedReport;

        }catch(err){
            console.log('error in creating report' + err);
        }
    }

    async getAllReports(patientID){
        try{
            const allReport = await ReportModel.find({patients: patientID});
            // console.log(allReport);
            return allReport
        }catch(err){
            console.log('error in fetching report' + err);
        }
    }

    
}