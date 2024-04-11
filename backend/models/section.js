import mongoose, { Schema } from "mongoose";

const sectionSchema = mongoose.Schema({
  index: { type: Number },
  title: { type: String },
});

const section = mongoose.model("Section", sectionSchema);
export default section;
