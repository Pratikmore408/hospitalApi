import PatientModel from "./patients.model.js";
import PatientRepository from "./patients.repository.js";

export default class PatientController {
    constructor(){
        this.patientRepository = new PatientRepository();
    }


    async register(req, res){
       const { name, age, contactNumber, gender} = req.body;
       try{
            // create patient model
            const user = new PatientModel(name, age, contactNumber, gender);
            // save user to db 
            const newUser = await this.patientRepository.register(user);
            // return saved user
            res.status(201).send(newUser);
        }catch(err){
            console.log(err);
            res.status(400).send("something wrong in register Patient"+ err);
        }
    }

    async createReport(req, res){
        const userID = req.userID;
        const {status} = req.body;
        const patientID = req.params.id;
        try{
            // create a new report in db
            const newReport = await this.patientRepository.create(userID, status, patientID);
            // return created report
            res.status(201).send(newReport);

        }catch(err){
            console.log('error in creating report' + err);
            res.status(400).send("error in creating report")
        }
    }

    async getAllReport(req, res){
        const patientID = req.params.id;
        try{
            // fetch reports from db
            const reports = await this.patientRepository.getAllReports(patientID);
            // return fetched report
            res.status(200).send(reports);
        }catch(err){
            console.log('error in fetching report' + err);
            res.status(400).send("error in fetching report")
        }
    }
}