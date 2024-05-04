import mongoose, { Schema, now } from "mongoose";

const QASchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  title: { type: String, require: true },
  description: { type: String },
  answer: { type: String },
  createdTime: { type: Date, default: Date.now() },
});

const QA = mongoose.model("QA", QASchema);
export default QA;