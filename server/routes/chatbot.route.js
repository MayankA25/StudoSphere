import { Router } from "express";
import { getChat, getResponse } from "../controllers/chatbot.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";

const chatbotRouter = Router();

chatbotRouter.get("/getchat", checkLogin, getChat)
chatbotRouter.post("/getresponse",checkLogin, getResponse)

export default chatbotRouter;