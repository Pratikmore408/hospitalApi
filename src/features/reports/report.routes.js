
import express from 'express';
import ReportController from './report.controller.js';


const reportRouter = express.Router();

const reportController = new ReportController();

reportRouter.get('/:status', (req, res)=>{
    reportController.getReportByStatus(req, res)
});

export default reportRouter;


