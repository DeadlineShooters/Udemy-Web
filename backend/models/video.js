import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  secureURL: { type: String },
  publicID: { type: String },
  type: { type: String }, // video or image
  duration: { type: Number },
});

export default videoSchema;