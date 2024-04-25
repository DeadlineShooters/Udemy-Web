import mongoose, { Schema } from 'mongoose';
import Image from './image.js';
import Category from './category.js';
import Instructor from './instructor.js';
import Section from './section.js';
import Video from './video.js';

const courseSchema = mongoose.Schema({
    name: { type: String, require: true },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    totalStudent: { type: Number, default: 0},
    introduction: { type: String },
    description: {type: String},
    price: { type: Number },
    sectionList: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    promotionalVideo: {type: Schema.Types.ObjectId, ref: "Video"},
    category: {type: Schema.Types.ObjectId, ref: "Category" },
    totalLecture: {type: Number},
    totalSection: {type: Number},
    totalLength: {type: Number},
    avgRating: {type: Number},
    thumbNail: {type: Object},
    status: {type: Boolean},
    createDate: {type: Date, default: Date.now()},
    totalRevenue: { type: Number, default: 0 },
    fiveStarCnt: { type: Number, default: 0 },
    fourStarCnt: { type: Number, default: 0 },
    threeStarCnt: { type: Number, default: 0 },
    twoStarCnt: { type: Number, default: 0 },
    oneStarCnt: { type: Number, default: 0 },
})

const Course = mongoose.model("Course", courseSchema);
export default Course;