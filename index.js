import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

import { connectToDb } from './src/config/mongoose.js';
import doctorRouter from './src/features/users/doctors/doctors.routes.js';
import patientRouter from './src/features/users/patients/patients.routes.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import reportRouter from './src/features/reports/report.routes.js';

// getting the server
const server = express();

// access the .env files
dotenv.config();

// parse the json
server.use(express.json());

// cors configuration
server.use(cors());

// using the appropriate routers for diff URLs
server.use('/doctors', doctorRouter);

server.use('/patients', jwtAuth,patientRouter);

server.use('/reports', jwtAuth ,reportRouter);

server.use('/', (req, res)=>{
    res.status(200).send('Welcome to Hospital Api');
})

// listening to server
server.listen(2000, ()=>{
    console.log('server is listening on port 2000');
    // connecting to database
    connectToDb();
});