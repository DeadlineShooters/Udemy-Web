import mongoose, { Schema } from "mongoose";
import instructorSchema from "./instructor.js";

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String, required: true },
    bio: {type: String },
    header: {type: String },
    courseList: [{
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        progress: { type: Number, default: 0 },
        completed: { type: Boolean, default: false },
        lectures: [{
            lecture: { type: Number },
            viewed: { type: Boolean, default: false }
        }],
        isArchived: {type: Boolean, default: false},
        certificate: {type: Schema.Types.ObjectId, ref: "Certificate"}
    }],
    wishList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    favoritesCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    reminderDays: { type: [Number] },
    reminderTimes: { type: [Number] },
    reminderNotification: { type: Boolean },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    socialLinks: {
        web: { type: String, default: "" },
        youtube: { type: String, default: "" },
        facebook: { type: String, default: "" }
    },
    archivedCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    cart: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    instructor: instructorSchema,
    verified: {type: Boolean, default: false}
}); 

const User = mongoose.model("User", userSchema);
export default User;
