import mongoose, { Schema } from "mongoose";
import videoSchema from "./video.js";

const lectureSchema = mongoose.Schema({
  sectionID: { type: Schema.Types.ObjectId, ref: "Section" },
  index: { type: Number },
  name: { type: String },
  content: { type: String },
  video: videoSchema,
});

const lecture = mongoose.model("Lecture", lectureSchema);
export default lecture;
