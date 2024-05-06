import mongoose from 'mongoose';
import Course from '../models/course.js';
import ElasticCourse from '../models/elasticCourse.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);

try {
	await mongoose.connect(mongoURI);
	console.log('Connected to the database');
} catch (error) {
	console.log('Could not connect to the database', error);
}

await ElasticCourse.deleteMany({})
    .then(() => console.log('Data deleted'))
    .catch((error) => console.log(error));

try {
	let courses = await Course.find({}).populate('category').populate('instructor');
	courses.forEach(async (course) => {
		let data = {
			id: course.id,
			name: course.name,
			instructor: {
				firstName: course.instructor.firstName,
				lastName: course.instructor.lastName,
				headline: course.instructor.headline,
				bio: course.instructor.bio,
			},
			introduction: course.introduction,
			category: course.category.name
		};
		let elasticCourse = new ElasticCourse(data);
		await elasticCourse.save();
	});
	console.log("Completed seeding the data")
} catch (error) {
	console.log(error);
}
