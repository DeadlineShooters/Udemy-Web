import mongoose, { Schema } from "mongoose";

const instructorSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    headline: {type: String},
    bio: {type: String},
    totalReviews: {type: Number},
    totalStudents: {type: Number},
    wallet: { walletID: {type: String}, walletName: {type: String}},
})

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;