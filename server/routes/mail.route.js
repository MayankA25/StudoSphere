import { Router } from "express";
import { sendMail, uploadAttachments } from "../controllers/mail.controller.js";
import { upload } from "../utils/multer.js";



const mailRouter = Router();

mailRouter.post("/sendmail", sendMail)
mailRouter.post("/upload", upload.array('files'), uploadAttachments)

export default mailRouter