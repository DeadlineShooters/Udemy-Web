import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    secureURL: {type: String},
    publicURL: {type: String},
});

const image = mongoose.model("Image", imageSchema);
export default image;