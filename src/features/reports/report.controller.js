
import ReportRepository from "./report.repository.js";


export default class ReportController {
    constructor(){
        this.reportRepository = new ReportRepository();
    }

    async getReportByStatus(req, res){
        const status = req.params.status;
        try{
            // get the reports from db and return
            const reports = await this.reportRepository.getAllReports(status);
            res.status(200).send(reports);

        }catch(err){
            console.log('error in creating report' + err);
            res.status(400).send("error in creating report")
        }

    }
}