import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  secureURL: { type: String },
  publicURL: { type: String },
});

export default imageSchema;
