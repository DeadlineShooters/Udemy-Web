import mongoose, { Schema } from 'mongoose';
import Image from './image.js';
import Category from './category.js';
import Instructor from './instructor.js';
import Section from './section.js';
import Video from './video.js';

const courseSchema = mongoose.Schema({
    name: { type: String, require: true },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    totalStudent: { type: Number },
    introduction: { type: String },
    description: {type: String},
    price: { type: Number },
    sectionList: { type: Schema.Types.ObjectId, ref: "Section" },
    promotionalVideo: {type: Schema.Types.ObjectId, ref: "Video"},
    category: {type: String},
    totalLecture: {type: Number},
    totalSection: {type: Number},
    totalLength: {type: Number},
    rating: {type: Number},
    thumbNail: {type: Object},
    status: {type: Boolean},
    createDate: {type: Date, default: Date.now()},
})

const Course = mongoose.model("Course", courseSchema);
export default Course;