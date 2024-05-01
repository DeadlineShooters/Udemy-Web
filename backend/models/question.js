import mongoose, { Schema } from "mongoose";
import User from "./user";
import Course from "./course";
import Answer from "./answer";


const questionSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    course: {type: Schema.Types.ObjectId, ref: "Course"},
    title: {type: String, require: true},
    description: { type: String },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    createdAt: {type: Date, default: Date.now()},
})

export default Question = mongoose.model("Instructor", questionSchema);