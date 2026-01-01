import axios from "axios";

export const chatbotInstance = axios.create({
    baseURL: "http://localhost:11434",
    withCredentials: true
})