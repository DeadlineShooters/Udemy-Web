import mongoose, { Schema } from "mongoose";

const feedbackResponseSchema = new mongoose.Schema({
  instructorId: { type: Schema.Types.ObjectId, ref: "Instructor" },
  content: { type: String },
  createdTime: { type: Date, default: Date.now() },
});

export default feedbackResponseSchema;
