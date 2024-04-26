import mongoose, { Schema } from "mongoose";

const instructorSchema = mongoose.Schema({
  headline: { type: String },
  totalReviews: { type: Number },
  totalStudents: { type: Number },
  bio: { type: String },
  courseList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  wallet: { walletID: { type: String }, walletName: { type: String } },
});

export default instructorSchema;
