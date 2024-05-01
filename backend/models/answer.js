import mongoose, { Schema, now } from "mongoose";

const answerSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    content: {type: String, require: true},
    createdAt: {type: Date, default: Date.now()},
})

const Answer = mongoose.model("Instructor", answerSchema);
export default Answer;