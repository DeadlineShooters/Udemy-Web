import mongoose, { model } from "mongoose";
import Course from "../../models/course.js";
import Section from "../../models/section.js";
import Lecture from "../../models/lecture.js";
import createCourseSlug from "../../utils/slugGenerate.js";

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
        newCourse.slugName = createCourseSlug(data.title);
        newCourse.status = true;
        
        for (const sectionData of data.sections) {
            const section = new Section({
                name: sectionData.name,
                lectureList: []
            });
            for (const lectureData  of sectionData.lectures) {
                // Get the highest index value for lectures in the section
                const maxIndex = await Lecture.aggregate([
                    { $group: { _id: null, maxIndex: { $max: "$index" } } }
                ]);
        
                // Calculate the new index for the lecture
                const newIndex = (maxIndex.length > 0) ? maxIndex[0].maxIndex + 1 : 1;

                const newLecture = new Lecture({
                    index: newIndex,
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
        
        const updatedCourse = await Course.findByIdAndUpdate(courseId, data, {new: true}).populate({
            path: "sectionList",
            populate: "lectureList",
        });
        const newSlug = createCourseSlug(data.name);
        updatedCourse.slugName = newSlug;
        await updatedCourse.save();
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

export const updateSection = async (req, res) => {
    try {
        const { data } = req.body;
        const { courseId } = req.params;

        // Create an array to hold the IDs of the newly created sections
        const sectionIds = [];

        // Iterate over the sections in the data and create/update them
        for (const sectionData of data.sectionList) {
            // Create an array to hold the IDs of the lectures within the section
            const lectureIds = [];

            // Iterate over the lectures in the section data and create/update them
            for (const lectureData of sectionData.lectureList) {
                // If the lecture has an ID, update it; otherwise, create a new one
                if (lectureData._id) {
                    const updatedLecture = await Lecture.findByIdAndUpdate(lectureData._id, lectureData, { new: true });
                    lectureIds.push(updatedLecture._id);
                } else {
                    const newLecture = new Lecture(lectureData);
                    const maxIndex = await Lecture.aggregate([
                        { $group: { _id: null, maxIndex: { $max: "$index" } } }
                    ]);
                    const newIndex = (maxIndex.length > 0) ? maxIndex[0].maxIndex + 1 : 1;
                    newLecture.index = newIndex;
                    const savedLecture = await newLecture.save();
                    lectureIds.push(savedLecture._id);
                }
            }

            // Update the lectureList of the section with the IDs of the newly created or updated lectures
            const sectionWithLectures = { ...sectionData, lectureList: lectureIds };

            // If the section has an ID, update it; otherwise, create a new one
            if (sectionWithLectures._id) {
                const updatedSection = await Section.findByIdAndUpdate(sectionWithLectures._id, sectionWithLectures, { new: true });
                sectionIds.push(updatedSection._id);
            } else {
                const newSection = new Section(sectionWithLectures);
                const savedSection = await newSection.save();
                sectionIds.push(savedSection._id);
            }
        }

        // Update the course with the updated sectionList
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { sectionList: sectionIds },
            { new: true }
        ).populate({
            path: "sectionList",
            populate: "lectureList",
        });

        console.log("course after edit: ", updatedCourse);
        
        if (updatedCourse) {
            return res.status(200).send({ success: true, message: "Course updated successfully", course: updatedCourse });  
        } else {
            return res.status(400).send({ success: false, message: "Course update failed", course: updatedCourse });  
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

