
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
            // get the password and hash it
            const hashedPassword = await bcrypt.hash(password, 12);
            // create the user model using hashed password
            const newUser = new DoctorModel(email, hashedPassword, name, contactNumber);
            // save user in db
            await this.doctorRepository.signUp(newUser);
            // return user
            res.status(201).send(newUser);
        }catch(err){
            console.log(err);
            res.staus(400).send("something wrong in SignUp");
        }
    }

    async signIn(req, res){
        const { email, password}= req.body;
        try{
            // get the user from db
            const user = await this.doctorRepository.signIn(email);
            // if user not exist then throw err
            if(!user){
                return res.status(400).send('Incorrect Credentials ');
            }else{
                // if exist the compare the hashed password
                const result = await bcrypt.compare(password, user.password);
                // if password matched the generate and return the token
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
                    // if password don't match then throw err
                    return res.status(400).send('Incorrect Credentials');
                }
            }
        }catch(err){
            console.log(err);
            res.staus(400).send("something wrong in signIn");
        }     
    }

    async resetPassword(req, res){
        // get the new password
        const { newPassword }= req.body;
        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const userID = req.userID
        try{
            // set the new password in db 
            await this.doctorRepository.resetPassword(userID, hashedPassword);
            res.status(200).send('Password is Updated');

        }catch(err){
            console.log(err);
            res.status(400).send("something wrong in ResetPassword");
        }
    }
}
