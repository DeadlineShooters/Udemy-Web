import mongoose, { Schema } from "mongoose";

const instructorSchema = mongoose.Schema({
  headline: { type: String },
  totalReviews: { type: Number, default: 0 },
  totalStudents: { type: Number, default: 0 },
  bio: { type: String },
  courseList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  wallet: { walletID: { type: String }, walletName: { type: String } },
});

export default instructorSchema;
