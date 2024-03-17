import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema({
    name: { type: String, require: true },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    totalStudent: { type: Number },
    introduction: { type: String },
    price: { type: Number },
    sectionList: { type: Schema.Types.ObjectId, ref: "Section" },
    promotionalVideo: {type: Schema.Types.ObjectId, ref: "Video"},
    category: {type: String},
    totalLecture: {type: Number},
    totalSection: {type: Number},
    totalLength: {type: Number},
    rating: {type: Number},
    thumbNail: {type: Schema.Types.ObjectId, ref: "Image"},
    status: {type: Boolean},
    createDate: {type: Date, default: Date.now()},
})

const course = mongoose.model("Course", courseSchema);
export default course;