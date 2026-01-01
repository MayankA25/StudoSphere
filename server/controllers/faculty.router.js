import { Faculty } from "../models/Faculty.js";

export const uploadFaculties = async(req, res)=>{
    const { faculties } = req.body;
    try{
        await Faculty.deleteMany({user: req.session.passport.user.user._id});
        await Faculty.insertMany(faculties);
        return res.status(201).json({ msg: "Faculties Added Successfully" })
    }catch(e){
        console.log(e);
        res.status(400).json({ msg: "Some Error Occurred" })
    }
}

export const getFaculties = async(req, res)=>{
    try{
        const faculties = await Faculty.find({ user: req.session.passport.user.user._id });

       
        
        return res.status(200).json({ faculties });
        
    }catch(e){
        console.log(e);
        res.status(500).json({ msg: "Cannot Get Faculties" })
    }
}