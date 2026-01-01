import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" })

const getTransporter = async(senderMail, accessToken, refreshTokem)=>{
    // console.log(senderMail, accessToken, refreshTokem)
    // console.log("Here...")
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: true,
        auth: {
            type: "OAuth2",
            user: senderMail,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            accessToken: accessToken,
            refreshToken: refreshTokem
        },
        pool: true,
        maxConnections: 5,
        rateLimit: 5 
    })
    // console.log("Here Too...")
    return transporter;
}   

export const sendMail = async(senderMail, recipient, accessToken, refreshToken, subject, message, cc, bcc, attachment)=>{
    console.log("Inside Send Mail Funcn")
    console.log("Access Token: ", accessToken)
    console.log("Refresh Token: ", refreshToken)
    const transporter = await getTransporter(senderMail, accessToken, refreshToken);

    const mailOptions = {
        from: senderMail,
        to: recipient,
        cc: cc,
        bcc: bcc,
        subject: subject,
        html: message,
        attachments: attachment
    }

    try{

        let info = await transporter.sendMail(mailOptions);
        console.log("Email Sent To: ", recipient);

    }catch(e){
        console.log(e);
        console.log("Error While Sending Mail To: ", recipient)
        throw new Error("Error While Sending Mail")
    }
}