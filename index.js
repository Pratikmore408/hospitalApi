import express from 'express'
import dotenv from 'dotenv'
import { connectToDb } from './src/config/mongoose.js';
import doctorRouter from './src/features/users/doctors/doctors.routes.js';
import patientRouter from './src/features/users/patients/patients.routes.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import reportRouter from './src/features/reports/report.routes.js';

const server = express();

dotenv.config();

server.use(express.json());

server.use('/doctors', doctorRouter);

server.use('/patients', jwtAuth,patientRouter);

server.use('/reports', jwtAuth ,reportRouter);

server.use('/', (req, res)=>{
    res.status(200).send('Welcome to Hospital Api');
})


server.listen(2000, ()=>{
    console.log('server is listening on port 2000');
    connectToDb();
});