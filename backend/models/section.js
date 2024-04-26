import mongoose, { Schema } from "mongoose";

const sectionSchema = mongoose.Schema({
  index: { type: Number },
  title: { type: String },
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;
