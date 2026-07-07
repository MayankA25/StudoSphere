import { Router } from "express";
import { sendMail, uploadAttachments } from "../controllers/mail.controller.js";
import { upload } from "../utils/multer.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { checkAdminLogin } from "../middleware/admin.middleware.js";



const mailRouter = Router();

mailRouter.post("/sendmail",checkLogin, checkAdminLogin, sendMail)
mailRouter.post("/upload", upload.array('files'), uploadAttachments)

export default mailRouter