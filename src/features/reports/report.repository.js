import mongoose from "mongoose";
import { ReportSchema } from "./report.schema.js";

const ReportModel = mongoose.model('Report', ReportSchema);
// create the repository class
export default class ReportRepository {
    
    async getAllReports(status){
        try{
            // find and return the report matching given status
            const allReport = await ReportModel.find({status: status});
            console.log(allReport);
            return allReport
        }catch(err){
            console.log('error in creating report' + err);
        }
    }  
}