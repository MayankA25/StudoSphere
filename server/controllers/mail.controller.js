import { Mail } from "../models/Mail.js";
import cloudinary from "../utils/cloudinary.js";
import { mailQueue } from "../utils/queue.js";
import fs from "fs";
import path from "path";

export const sendMail = async(req, res)=>{
    const { recipients, subject, message, attachment } = req.body

    // console.log(recipients);

    // console.log(req.session.passport.user)

    try{
        const senderMail = req.session.passport.user.user.email;
        const accessToken = req.session.passport.user.accessToken;
        const refreshToken = req.session.passport.user.refreshTokem
        console.log(recipients);
        const cc = recipients[1]
        const bcc = recipients[2];
        console.log(attachment);
        for(const recipient of recipients[0]){
            if(recipient == "") continue;
            console.log("Sending Email To: ", recipient)
            await mailQueue.add('sendMail', {senderMail, recipient, accessToken, refreshToken, subject, message, cc, bcc, attachment: attachment })
        }
        const newMail = new Mail({
            senderName: req.session.passport.user.user.username,
            senderMail: senderMail,
            to: recipients[0],
            cc: recipients[1],
            bcc: recipients[2]
        });
        await newMail.save();
        return res.status(200).json({ msg: `Emails Sent Successfully` })
    }catch(e){
        console.log(e);
        return res.status(400).json({ msg: "Error While Sending Mail..." })
    }
}


export const uploadAttachments = async(req, res)=>{
    try{

        const urls = await Promise.all(req.files.map(async (file)=>{
            console.log(file.originalname);
            const uniqueId = Date.now();
            const newPath = `${file.path}${path.extname(file.originalname)}`;
            fs.renameSync(file.path, newPath);
            console.log("Path: ", newPath)
            const fileName = file.originalname.split(".")[0]
            const publicId = `${fileName}_${uniqueId}`
            const url = await cloudinary.uploader.upload(newPath, { resource_type: "raw", public_id: publicId });
            console.log(url)
            console.log(url.format);
            fs.unlinkSync(newPath);
            return url.secure_url;
        }));

        res.status(200).json({ urls })
    }catch(e){
        console.log("Upload Error: ", e);
        res.status(400).json({ msg: "Error While Uploading" })
    }
}