import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    userId: {
        type: String,
        requiredL: true
    },
    sharedBy: {
        type: String,
        default: ""
    },
    sharedTo:[{
        type: String,
        default: ""
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: new Date(Date.now()).toISOString()
    },
    deadline:{
        type: Date
    },
    completed: {
        type: Boolean,
        default: "false"
    },
    tags: {
        type: String,
    }
})

export const Todo = new mongoose.model("Todo", todoSchema);