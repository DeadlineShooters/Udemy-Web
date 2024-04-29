import mongoose, { Schema } from 'mongoose';
import User from './user.js';
import Course from './course.js';

const transactionSchema = new mongoose.Schema({
	student: { type: Schema.Types.ObjectId, ref: 'User' },
	instructor: { type: Schema.Types.ObjectId, ref: 'User' },
	course: { type: Schema.Types.ObjectId, ref: 'Course' },
	amount: { type: Number },
	date: { type: Date, default: Date.now() },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
