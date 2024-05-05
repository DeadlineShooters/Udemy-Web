import mongoose, { Schema } from "mongoose";
import User from "./user.js";
import Course from "./course.js";
import Answer from "./answer.js";


const questionSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    course: {type: Schema.Types.ObjectId, ref: "Course"},
    title: {type: String, require: true},
    description: { type: String },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    createdAt: {type: Date, default: Date.now},
})

// Middleware to remove associated answers when a question is deleted
questionSchema.pre('findByIdAndDelete', function(next) {
    // 'this' refers to the document being removed (the question)
    // Remove all associated answers
    this.model('Answer').deleteMany({ _id: { $in: this.answers } }, next);
});

const Question = mongoose.model("Question", questionSchema);
export default Question;