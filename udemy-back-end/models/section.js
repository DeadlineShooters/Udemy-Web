import mongoose, { Schema } from "mongoose";

const sectionSchema = mongoose.Schema({
    index: {type: Number},
    name: {type: String},
    lectureList: {type: Schema.Types.ObjectId, ref: "Lecture"},
})

const section = mongoose.model("Section", sectionSchema);
export default section;