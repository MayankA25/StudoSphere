import { Router } from "express";
import { getChat, getResponse } from "../controllers/chatbot.controller.js";

const chatbotRouter = Router();

chatbotRouter.get("/getchat", getChat)
chatbotRouter.post("/getresponse", getResponse)

export default chatbotRouter;