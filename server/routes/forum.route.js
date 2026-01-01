import { Router } from "express";
import { addReply, deleteMessage, editMessage, getMessages, getUserInfo, sendMessage } from "../controllers/forum.controller.js";
const forumRouter = Router();

forumRouter.get("/messages", getMessages)
forumRouter.post("/sendmessage", sendMessage);
forumRouter.post("/getuser", getUserInfo);
forumRouter.post("/addreply", addReply);
forumRouter.patch("/editmessage", editMessage);
forumRouter.delete("/deletemessage", deleteMessage)

export default forumRouter