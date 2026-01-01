import mongoose, { Schema } from "mongoose";

const chatbotSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
}, {timestamps: true})


export const Chatbot = mongoose.model("Chatbot", chatbotSchema);