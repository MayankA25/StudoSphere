import { Worker } from "bullmq";
import { connection } from "./redis.js";
import { sendMail } from "./email.js";

console.log("Worker Started");

const worker = new Worker("mailQueue", async(job)=>{
    const { senderMail, recipient, accessToken, refreshToken, subject, message, cc , bcc, attachment } = job.data;
    await sendMail(senderMail, recipient, accessToken, refreshToken, subject, message, cc, bcc, attachment);
}, { connection })


worker.on("completed", (job)=>{
    console.log("Worker: Email Sent Successfully: ", job.data.recipient)
})
worker.on("failed", (job)=>{
    console.log("Worker: Failed TO Send Email To: ", job.data.recipient)
})