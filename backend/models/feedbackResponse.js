import mongoose, { Schema } from "mongoose";
import User from "./user.js";

const feedbackResponseSchema = new mongoose.Schema({
  instructorId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  createdTime: { type: Date, default: Date.now() },
});

export default feedbackResponseSchema;
