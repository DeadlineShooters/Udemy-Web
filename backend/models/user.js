import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    header: { type: String },
    bio: { type: String },
    socialLinks: { web: {type: String, default: ""}, youtube: {type: String, default: ""}, facebook: {type: String, default: ""}},
    courseList: { type: Array },
    archivedCourse:  { type: Array },
    wishList: { type: Array },
    favoritesCourse: { type: Array },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" }
})

const User = mongoose.model("User", userSchema);
export default User;