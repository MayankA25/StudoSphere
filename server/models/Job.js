import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    companyName: {
        type: String, 
        required: true
    },
    companyLogo: {
        type: String
    },
    jobDescription: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        default: "Not Mentioned"
    },
    batch: {
        type: Number
    },
    jobType: {
        type: String,   //Internship | Part-Time | Full Time | Remote
        required: true
    },
    salary: {
        type: Number, 
        default: 0 
    },
    skills: [{
        type: String,
        default: "",
    }],
    shortListed: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    applicants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    rejectedUsers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    deadline: {
        type: Date,
        required: true
    }
}, {timestamps: true});


export const Job = mongoose.model("Job", jobSchema);
