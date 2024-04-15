import mongoose, { Schema } from "mongoose";

const lectureSchema = mongoose.Schema({
    index: {type: Number},
    name: {type: String},
    content: {type: String},
    video: {type: Schema.Types.ObjectId, ref: "Video"},
    QA: [{type: Schema.Types.ObjectId, ref: "QA"}],
})

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;