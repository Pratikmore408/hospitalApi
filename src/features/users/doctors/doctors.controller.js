
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import DoctorModel from './doctors.models.js';
import DoctorsRepository from './doctors.repository.js';
import jwt from 'jsonwebtoken';

dotenv.config();




export default class DoctorController{

    constructor(){
        this.doctorRepository = new DoctorsRepository();
    }

    async signUp(req, res){
        const { email, password, name, contactNumber }= req.body;
            
        try{
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new DoctorModel(email, hashedPassword, name, contactNumber);
            await this.doctorRepository.signUp(newUser);
            res.status(201).send(newUser);
        }catch(err){
            console.log(err);
            res.staus(400).send("something wrong in SignUp");
        }
    }

    async signIn(req, res){
        const { email, password}= req.body;
        try{
            const user = await this.doctorRepository.signIn(email);

            if(!user){
                return res.status(400).send('Incorrect Credentials ');
            }else{
                const result = await bcrypt.compare(password, user.password);

                if(result){
                    const token = jwt.sign(
                        {
                            userID: user._id,
                            email: user.email
                        },
                        process.env.JWT,
                        {
                            expiresIn: '2h'
                        }
                    );
                    return res.status(200).send(token);
                }else{
                    return res.status(400).send('Incorrect Credentials');
                }
            }

        }catch(err){
            console.log(err);
            res.staus(400).send("something wrong in signIn");
        }

        
    }

    async resetPassword(req, res){
        const { newPassword }= req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const userID = req.userID
        try{
            await this.doctorRepository.resetPassword(userID, hashedPassword);
            res.status(200).send('Password is Updated');
            

        }catch(err){
            console.log(err);
            res.status(400).send("something wrong in ResetPassword");
        }
    }
}
