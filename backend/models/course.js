import mongoose, { Schema } from 'mongoose';
import videoSchema from './video.js';
import imageSchema from './image.js';
import User from './user.js';
import Section from './section.js';
import Category from './category.js';

const courseSchema = mongoose.Schema({
	name: { type: String, require: true },
	instructor: { type: Schema.Types.ObjectId, ref: 'User' },
	totalStudent: { type: Number },
	introduction: { type: String },
	price: { type: Number },
	sectionList: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
	promotionalVideo: { type: Object },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	totalLecture: { type: Number },
	totalSection: { type: Number },
	totalLength: { type: Number },
	avgRating: { type: Number, default: 0.0 },
	thumbNail: { type: Object },
	status: { type: Boolean },
	createDate: { type: Date, default: Date.now() },
	totalRevenue: { type: Number, default: 0 },
	fiveStarCnt: { type: Number, default: 0 },
	fourStarCnt: { type: Number, default: 0 },
	threeStarCnt: { type: Number, default: 0 },
	twoStarCnt: { type: Number, default: 0 },
	oneStarCnt: { type: Number, default: 0 },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
