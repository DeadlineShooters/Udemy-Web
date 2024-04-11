import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  secureURL: { type: String },
  publicURL: { type: String },
  type: { type: String }, // video or image
  duration: { type: Number },
});

export default videoSchema;
