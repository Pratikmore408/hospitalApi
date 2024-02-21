import mongoose from 'mongoose'
import {DoctorSchema} from './doctors.schema.js'

const DoctorModel = mongoose.model('Doctor', DoctorSchema);


export default class DoctorsRepository{
   

    async signUp(user){
        try{
            const newdoctor = new DoctorModel(user);
            await newdoctor.save();
            return newdoctor;
        }catch(err){
            console.log("error in saving user"  + err);
        }
        
    }

    async signIn(email){
        try{
            const user =  await DoctorModel.findOne({email});
            console.log(user);
            return user;
        }catch(err){
            console.log("error in login user"  + err);
        }
        
    }

    async resetPassword(userID, hashedPassword){
        try{
            const user =  await DoctorModel.findById(userID);
            if(user){
                user.password = hashedPassword;
                await user.save();
            }else{
                throw new Error("No User found");
            }
            
        }catch(err){
            console.log("error in login user"  + err);
        }
    }
}