import mongoose, { Schema } from "mongoose"

const mailSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    senderMail: {
        type: String,
        required: true
    },
    to: [{
        type: String
    }],
    cc: [{
        type: String
    }],
    bcc: [{
        type: String
    }],
    attachments: [{
        filename: {
            type: String
        },
        path: {
            type: String
        }
    }]
}, { timestamps: true })


export const Mail = mongoose.model("Mail", mailSchema);