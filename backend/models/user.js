import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    header: {type: String},
    bio: {type: String},
    courseList: { type: Array },
    wishList: { type: Array },
    favoritesCourse: { type: Array },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" }
})

const user = mongoose.model("User", userSchema);
export default user;