import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema({
    user: {

    },
    Name: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone_Number:{
        type: String,
        required: true
    },
    Designation:{
        type: String,
        required: true
    },
    Office_Room: {
        type: String,
        required: true
    },
    Joining_Date: {
        type: String,
        required: true
    }
})

export const Faculty = new mongoose.model("Faculty", facultySchema);
