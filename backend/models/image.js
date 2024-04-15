import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    secureURL: {type: String},
    publicURL: {type: String},
});

const Image = mongoose.model("Image", imageSchema);
export default Image;