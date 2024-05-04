import mongoose, { Schema, now } from "mongoose";
import User from "./user.js";
import Question from "./question.js";

const answerSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    content: {type: String, require: true},
    createdAt: {type: Date, default: Date.now()},
})

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;