import mongoose, { Schema, now } from "mongoose";

const certificateSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  completionDate: { type: Date },
  signature: {type: String },
});

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;