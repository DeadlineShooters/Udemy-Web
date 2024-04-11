import mongoose, { Schema } from "mongoose";
import feedbackResponseSchema from "./FeedbackResponse.js";

const feedbackSchema = mongoose.Schema({
  courseID: { type: Schema.Types.ObjectId, ref: "Course" },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  feedback: { type: String },
  rating: { type: Number },
  createdTime: { type: Date, default: Date.now() },
  instructorResponse: feedbackResponseSchema,
});

const lecture = mongoose.model("Lecture", lectureSchema);
export default lecture;
