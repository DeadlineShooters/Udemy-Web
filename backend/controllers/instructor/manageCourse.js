import mongoose from "mongoose";
import Course from "../../models/course.js";
import Image from "../../models/image.js";
import Video from "../../models/video.js";
import Section from "../../models/section.js";
import Lecture from "../../models/lecture.js";

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

        const newPromotionalVideo = new Video({
            secureURL : data.promotionalVideo.secureURL,
            publicID : data.promotionalVideo.publicID,
            duration: data.promotionalVideo.duration
        });
        const savePromotionalVideo = await newPromotionalVideo.save();
        newCourse.promotionalVideo = savePromotionalVideo._id;

        for (const sectionData of data.sections) {
            const section = new Section({
                name: sectionData.name,
                lectureList: []
            });
            for (const lectureData  of sectionData.lectures) {
                const newVideo = new Video({
                    secureURL: lectureData.video.secureURL,
                    publicID: lectureData.video.publicID,
                    duration: lectureData.video.duration
                })
                const video = await newVideo.save();

                const newLecture = new Lecture({
                    name: lectureData.name,
                    video: video._id,
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