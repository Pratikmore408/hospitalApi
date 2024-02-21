import PatientModel from "./patients.model.js";
import PatientRepository from "./patients.repository.js";

export default class PatientController {
    constructor(){
        this.patientRepository = new PatientRepository();
    }


    async register(req, res){
       const { name, age, contactNumber, gender} = req.body;
       try{
            const user = new PatientModel(name, age, contactNumber, gender);
            const newUser = await this.patientRepository.register(user);
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
        // console.log(patientID);
        try{
            const newReport = await this.patientRepository.create(userID, status, patientID);
            res.status(201).send(newReport);

        }catch(err){
            console.log('error in creating report' + err);
            res.status(400).send("error in creating report")
        }
    }

    async getAllReport(req, res){
        const patientID = req.params.id;
        try{
            const reports = await this.patientRepository.getAllReports(patientID);
            res.status(200).send(reports);
        }catch(err){
            console.log('error in fetching report' + err);
            res.status(400).send("error in fetching report")
        }
    }
}