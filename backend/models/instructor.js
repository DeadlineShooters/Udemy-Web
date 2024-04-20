import mongoose, { Schema } from "mongoose";

const instructorSchema = mongoose.Schema({
    headline: {type: String, default: ""},
    bio: {type: String, default: ""},
    totalReviews: {type: Number, default: 0},
    totalStudents: {type: Number, default: 0},
    wallet: { walletID: {type: String, default: ""}, walletName: {type: String, default: ""}},
})

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;