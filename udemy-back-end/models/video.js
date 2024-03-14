import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    secureURL: {type: String},
    publicURL: {type: String},
    type: {type: String},
    duration: {type: Number},
});

const video = mongoose.model("Video", videoSchema);
export default video;