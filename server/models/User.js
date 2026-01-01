import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    isHead: {
        type: Boolean,  
        default: false
    },
    regNo: {
        type: String
    },
    batch: {
        type: Number
    },
    dept: {
        type: String
    },
    cgpa: {
        type: Number,
    },
    skills: [{
        type: String,
    }],
    formSubmitted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    resume: {
        type: String
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)