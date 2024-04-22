import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    secureURL: {type: String},
    publicID: {type: String},
    type: {type: String},
    duration: {type: Number},
});

const Video = mongoose.model("Video", videoSchema);
export default Video;