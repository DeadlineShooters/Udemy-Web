import mongoose from 'mongoose';
import User from '../../models/user.js';
import Course from '../../models/course.js';
import Transaction from '../../models/transaction.js';
import dotenv from 'dotenv';
dotenv.config();

const controller = {};

controller.stats = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let courses = await Course.find({ instructor: userId });

		if (courseId !== '') {
			courses = courses.filter((course) => course._id.toString() === courseId);
		}

		let totalRevenue = 0;
		let totalEnrollments = 0;
		let totalRating = 0;

		courses.forEach((course) => {
			totalRevenue += course.price * course.totalStudent;
			totalEnrollments += course.totalStudent;
			totalRating += course.avgRating;
		});

		let avgRating = totalRating / courses.length;

		res.json({ success: true, totalRevenue, totalEnrollments, avgRating });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

controller.statsByMonth = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let courses = await Course.find({ instructor: userId });

		if (courseId !== '') {
			courses = courses.filter((course) => course._id.toString() === courseId);
		}

		let stats = await Transaction.aggregate([
			{
				$match: {
					instructor: new mongoose.Types.ObjectId(userId),
					course: { $in: courses.map((course) => new mongoose.Types.ObjectId(course._id)) },
					date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) },
				},
			},
			{
				$group: {
					_id: { month: { $month: '$date' }, year: { $year: '$date' } },
					totalRevenue: { $sum: '$amount' },
					totalEnrollments: { $sum: 1 },
					avgRating: { $avg: '$course.rating' },
				},
			},
			{
				$sort: { '_id.year': 1, '_id.month': 1 },
			},
		]);

		let revenues = stats.map((stat) => stat.totalRevenue);
		let enrollments = stats.map((stat) => stat.totalEnrollments);
		let ratings = stats.map((stat) => stat.avgRating);

		res.json({ success: true, revenues, enrollments, ratings: ratings[0] !== null ? ratings : [0] });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export default controller;
