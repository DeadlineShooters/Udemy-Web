import mongoose from 'mongoose';
import User from '../../models/user.js';
import Course from '../../models/course.js';
import dotenv from 'dotenv';
dotenv.config();

const controller = {};

controller.addToWishlist = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId).populate('cart').populate('wishList');
		if (user) {
			let course = await Course.findById(courseId);
			if (course) {
				let courseIndex = user.cart.findIndex((course) => course._id.toString() === courseId);
				if (courseIndex > -1) {
					user.cart.splice(courseIndex, 1);
				}

				user.wishList.push(courseId);
				await user.save();
				res.json({ success: true, course });
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

controller.removeFromWishlist = async (req, res) => {
	var { userId, courseId } = req.body;
	try {
		let user = await User.findById(userId).populate('wishList');
		if (user) {
			let courseIndex = user.wishList.findIndex((course) => course._id.toString() === courseId);
			if (courseIndex > -1) {
				let removedCourse = user.wishList.splice(courseIndex, 1);
				await user.save();
				res.json({ success: true, removedCourse: removedCourse[0] });
			} else {
				res.json({ success: false, message: 'Course not found in wishlist!' });
			}
		} else {
			res.json({ success: false, message: 'No user found!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

controller.wishlist = async (req, res) => {
	var { userId } = req.body;
	try {
		let user = await User.findById(userId).populate({
			path: 'wishList',
			populate: {
				path: 'instructor',
				model: 'User',
			},
		});
		if (user) {
			res.json({ success: true, wishlist: user.wishList });
		} else {
			res.json({ success: false, message: 'No user found!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export default controller;
