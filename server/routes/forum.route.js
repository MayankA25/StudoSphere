import { Router } from "express";
import { addReply, deleteMessage, editMessage, getMessages, getUserInfo, sendMessage } from "../controllers/forum.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { studentLoginCheck } from "../middleware/student.middleware.js";
const forumRouter = Router();

forumRouter.get("/messages",checkLogin, studentLoginCheck, getMessages)
forumRouter.post("/sendmessage",checkLogin, studentLoginCheck, sendMessage);
forumRouter.post("/getuser",checkLogin, studentLoginCheck, getUserInfo);
forumRouter.post("/addreply",checkLogin,studentLoginCheck, addReply);
forumRouter.patch("/editmessage",checkLogin,studentLoginCheck, editMessage);
forumRouter.delete("/deletemessage",checkLogin,studentLoginCheck, deleteMessage)

export default forumRouter