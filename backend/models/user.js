import mongoose, { Schema } from "mongoose";
import Course from "./course.js";

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String, required: true },
    avatar: { secure_url: String, public_id: String },
    courseList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    wishList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    favoritesCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    reminderDays: { type: [Number] },
    reminderTimes: { type: [Number] },
    reminderNotification: { type: Boolean },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    socialLinks: { web: {type: String, default: ""}, youtube: {type: String, default: ""}, facebook: {type: String, default: ""}},
    archivedCourse:  [{ type: Schema.Types.ObjectId, ref: "Course" }],
    cart: { type: Array },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" }
})

const User = mongoose.model("User", userSchema);
export default User;