import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true
    }, 
    senderProfilePic: {
        type: String
    },
    senderName: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    replies: [{
        type: Object
    }]
}, { timestamps: true })


export const Message = new mongoose.model("Message", messageSchema)