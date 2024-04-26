import mongoose, { Schema } from "mongoose";
import videoSchema from "./video.js";

const lectureSchema = mongoose.Schema({
  index: { type: Number },
  name: { type: String },
  content: { type: String },
  video: videoSchema,
  QA: [{ type: Schema.Types.ObjectId, ref: "QA" }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
