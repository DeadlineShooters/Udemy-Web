import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    secureURL: {type: String},
    publicID: {type: String},
});

const Image = mongoose.model("Image", imageSchema);
export default Image;