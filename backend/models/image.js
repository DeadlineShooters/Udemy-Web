import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  secureURL: { type: String },
  publicID: { type: String },
});

export default imageSchema;