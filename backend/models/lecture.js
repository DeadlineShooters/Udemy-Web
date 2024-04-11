import mongoose, { Schema } from "mongoose";

const lectureSchema = mongoose.Schema({
  sectionID: { type: Schema.Types.ObjectId, ref: "Section" },
  index: { type: Number },
  name: { type: String },
  content: { type: String },
  video: { type: Schema.Types.ObjectId, ref: "Video" },
});

const lecture = mongoose.model("Lecture", lectureSchema);
export default lecture;
