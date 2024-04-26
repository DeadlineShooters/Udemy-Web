import mongoose, { Schema } from 'mongoose';

const elasticCourseSchema = mongoose.Schema({
	id: { type: String, require: true },
	name: { type: String, require: true },
	instructor: { type: Object },
	introduction: { type: String },
	category: { type: Object },
});

const ElasticCourse = mongoose.model('ElasticCourse', elasticCourseSchema);
export default ElasticCourse;
