import mongoose from 'mongoose';
import User from '../../models/user.js';
import Course from '../../models/course.js';
import Transaction from '../../models/transaction.js';
import Feedback from '../../models/feedbackModel.js';
import dotenv from 'dotenv';
dotenv.config();

const controller = {};

controller.stats = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId);
		let courseIds = user.instructor.courseList;

		if (courseId !== '') {
			courseIds = courseIds.filter((id) => id.toString() === courseId);
		}

		let courses = await Course.find({ _id: { $in: courseIds } });

		let totalRevenue = 0;
		let totalEnrollments = 0;
		let totalRating = 0;
		let totalRatingsCount = 0;

		courses.forEach((course) => {
			totalRevenue += course.price * course.totalStudent;
			totalEnrollments += course.totalStudent;
			let courseRatingsCount = course.fiveStarCnt + course.fourStarCnt + course.threeStarCnt + course.twoStarCnt + course.oneStarCnt;
			totalRating += course.avgRating * courseRatingsCount;
			totalRatingsCount += courseRatingsCount;
		});

		let avgRating = totalRating / totalRatingsCount;

		res.json({ success: true, totalRevenue, totalEnrollments, avgRating });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

controller.statsByMonth = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId);
		let courseIds = user.instructor.courseList;

		if (courseId !== '') {
			courseIds = courseIds.filter((id) => id.toString() === courseId);
		}

		let courses = await Course.find({ _id: { $in: courseIds } });

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
				},
			},
			{
				$sort: { '_id.year': 1, '_id.month': 1 },
			},
		]);

		let revenues = new Array(12).fill(0);
		let enrollments = new Array(12).fill(0);

		let currentDate = new Date();

		let acml = { revenue: 0, enrollment: 0, rating: 0, feedback: 0 };
		let firstMonth = { revenue: 0, enrollment: 0, assign: false };

		for (let stat of stats) {
			let monthDiff = currentDate.getMonth() + 1 - stat._id.month + 12 * (currentDate.getFullYear() - stat._id.year);
			acml['revenue'] += stat.totalRevenue;
			acml['enrollment'] += stat.totalEnrollments;
			if (monthDiff >= 0 && monthDiff < 12) {
				revenues[monthDiff] = acml['revenue'];
				enrollments[monthDiff] = acml['enrollment'];
				if (firstMonth.assign === false) {
					firstMonth['revenue'] = acml['revenue'] - stat.totalRevenue;
					firstMonth['enrollment'] = acml['enrollment'] - stat.totalEnrollments;
					firstMonth['assign'] = true;
				}
			}
		}

		revenues.reverse();
		enrollments.reverse();

		revenues[0] = firstMonth.revenue;
		enrollments[0] = firstMonth.enrollment;

		for (let i = 1; i < 12; i++) {
			if (revenues[i] === 0) {
				revenues[i] = revenues[i - 1];
				enrollments[i] = enrollments[i - 1];
			}
		}

		let feedbacks = await Feedback.aggregate([
			{
				$match: {
					courseID: { $in: courses.map((course) => new mongoose.Types.ObjectId(course._id)) },
					createdTime: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) },
				},
			},
			{
				$group: {
					_id: { month: { $month: '$createdTime' }, year: { $year: '$createdTime' } },
					totalRating: { $sum: '$rating' },
					totalFeedbacks: { $sum: 1 },
				},
			},
			{
				$sort: { '_id.year': 1, '_id.month': 1 },
			},
		]);

		let ratings = new Array(12).fill(0);

		let firstMonthRating = 0;
		let firstMonthAssign = false;

		console.log(feedbacks)

		for (let feedback of feedbacks) {
			let monthDiff = currentDate.getMonth() + 1 - feedback._id.month + 12 * (currentDate.getFullYear() - feedback._id.year);
			acml.rating += feedback.totalRating;
			acml.feedback += feedback.totalFeedbacks;
			if (monthDiff >= 0 && monthDiff < 12) {
				ratings[monthDiff] = acml.rating / acml.feedback;
				if (firstMonthAssign === false) {
					firstMonthRating = acml.feedback - feedback.totalFeedbacks ? (acml.rating - feedback.totalRating) / (acml.feedback - feedback.totalFeedbacks) : 0;
					firstMonthAssign = true;
				}
			}
		}

		ratings.reverse();
		ratings[0] = firstMonthRating;

		for (let i = 1; i < 12; i++) {
			if (ratings[i] === 0) {
				ratings[i] = ratings[i - 1];
			}
		}

		res.json({ success: true, revenues, enrollments, ratings, totalFeedback: feedbacks[feedbacks.length - 1].totalFeedbacks });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export default controller;
