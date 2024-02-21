import express from 'express';
import PatientController from './patients.controller.js';

const patientRouter = express.Router();

const patientController = new PatientController();



patientRouter.post('/register', (req, res)=>{
    patientController.register(req, res)
});

patientRouter.post('/:id/create_report', (req, res)=>{
    patientController.createReport(req, res)
});

patientRouter.get('/:id/all_reports', (req, res)=>{
    patientController.getAllReport(req, res)
});

export default patientRouter;
