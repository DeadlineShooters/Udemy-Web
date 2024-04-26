import mongoose, { model } from "mongoose";
import Course from "../../models/course.js";
import Image from "../../models/image.js";
import Video from "../../models/video.js";
import Section from "../../models/section.js";
import Lecture from "../../models/lecture.js";
import videoSchema from "../../models/video.js";

export const createCourse = async (req, res) => {
    try {
        const {data} = req.body;
        console.log(data);
        const newCourse = new Course();
        newCourse.name = data.title;
        newCourse.introduction = data.introduction;
        newCourse.description = data.description;
        newCourse.category = data.category;
        newCourse.price = data.price;
        newCourse.sectionList = [];
        newCourse.totalSection = data.totalSection;
        newCourse.totalLecture = data.totalLecture;
        newCourse.totalLength = data.totalLength;
        newCourse.thumbNail = data.thumbNail;
        newCourse.instructor = data.instructor;
        newCourse.promotionalVideo = data.promotionalVideo;
        newCourse.status = true;
        
        for (const sectionData of data.sections) {
            const section = new Section({
                name: sectionData.name,
                lectureList: []
            });
            for (const lectureData  of sectionData.lectures) {
                const newLecture = new Lecture({
                    name: lectureData.name,
                    video: lectureData.video,
                })
                const lecture = await newLecture.save();
                section.lectureList.push(lecture._id);
                await section.save();
            }
            newCourse.sectionList.push(section._id); 
        }
        newCourse.save();
        return res.status(200).send({ success: true, message: "Course created successfully", course: newCourse});
    } catch (error) {
        console.log(error);
    }
}

export const getCourse = async (req, res) => {
    try {
        const {instructorID} = req.body;
        const courseList = await Course.find({instructor: instructorID}).populate({
            path: "sectionList",
            populate: "lectureList",
        });
        if (courseList) {
            return res.status(200).send({ success: true, message: "Course list found successfully", course: courseList}); 
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateCourse = async (req, res) => {
    try {
        const {data} = req.body;
        const {courseId} = req.params;
        console.log("course edit: ", data);
        console.log("Id", courseId);
        const updatedCourse = await Course.findByIdAndUpdate(courseId, data, {new: true});
        console.log("course after edit: ", updatedCourse);
        if (updatedCourse) {
            return res.status(200).send({ success: true, message: "Course updated successfully", course: updatedCourse});  
        } else {
            return res.status(400).send({ success: false, message: "Course updated failed", course: updatedCourse});  
        }
    } catch (error) {
        console.log(error);
    }
}