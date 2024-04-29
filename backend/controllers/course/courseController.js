import mongoose from 'mongoose';
import Course from '../../models/course.js';
import Category from '../../models/category.js';
import User from '../../models/user.js';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const controller = {};

controller.courses = async (req, res) => {
	let { category } = req.query;
	try {
		let courses;
		if (category) {
			let categoryObj = await Category.findOne({ id: category });
			courses = await Course.find({ category: categoryObj._id }).populate('category').populate('instructor');
		} else {
			courses = await Course.find().populate('category').populate('instructor');
		}
		if (courses.length > 0) {
			res.json({ success: true, courses });
		} else {
			res.json({ success: false });
		}
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
	}
};

controller.categories = async (req, res) => {
	try {
		let categories = await Category.find({});
		if (categories.length > 0) {
			res.json({ success: true, categories });
		} else {
			res.json({ success: false });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

controller.isEnrolled = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId);
		if (user) {
			if (user.courseList.includes(courseId)) {
				res.json({ success: true });
			} else {
				res.json({ success: false, message: 'No course found!' });
			}
		} else {
			res.json({ success: false, message: 'No user found!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

controller.isCarted = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId);
		if (user) {
			if (user.cart.includes(courseId)) {
				res.json({ success: true });
			} else {
				res.json({ success: false, message: 'No course found!' });
			}
		} else {
			res.json({ success: false, message: 'No user found!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

controller.isWishlisted = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId);
		if (user) {
			if (user.wishList.includes(courseId)) {
				res.json({ success: true });
			} else {
				res.json({ success: false, message: 'No course found!' });
			}
		} else {
			res.json({ success: false, message: 'No user found!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const client = new Client({
	cloud: {
		id: process.env.ELASTIC_CLOUD_ID,
	},
	auth: {
		username: 'elastic',
		password: process.env.ELASTIC_PASSWORD,
	},
});

controller.search = async (req, res) => {
	let { query } = req.query;
	try {
		let search = await client.search({
			query: {
				multi_match: {
					query,
					fields: ['*'],
				},
			},
		});
		let courses = await Promise.all(
			search.hits.hits.map(async (hit) => {
				let course = await Course.findById(new mongoose.Types.ObjectId(hit._source.id)).populate('category').populate('instructor');
				return course;
			})
		);
		courses = courses.filter((course) => course !== null);
		res.json({ success: true, courses });
	} catch (error) {
		res.status(500).send(error);
	}
};

export default controller;
