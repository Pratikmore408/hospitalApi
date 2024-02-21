import express from 'express';
import DoctorController from './doctors.controller.js';
import jwtAuth from '../../../middleware/jwt.middleware.js';

const doctorRouter = express.Router();

const doctorController = new DoctorController();

doctorRouter.post('/register', (req, res)=>{
    doctorController.signUp(req, res)
});

doctorRouter.post('/login', (req, res)=>{
    doctorController.signIn(req, res)
});

doctorRouter.put('/resetpassword',jwtAuth, (req, res)=>{
    doctorController.resetPassword(req, res)
});

export default doctorRouter;