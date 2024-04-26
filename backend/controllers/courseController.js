import mongoose from "mongoose";
import Lecture from "../models/lecture.js";
import course from "../models/course.js";
import Section from "../models/section.js";
import User from "../models/user.js";

const { Types } = mongoose;
const controller = {};

controller.createCourse = async (req, res) => {
  const { name, category } = req.body;

  try {
    const newCourse = new course({
      name,
      category,
    });

    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    let courseDetails = await course.findById(id).populate("sectionList").populate("instructor");
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    courseDetails = courseDetails.toObject();
    // Fetch the lectures for each section
    for (let section of courseDetails.sectionList) {
      section.lectures = await Lecture.find({ sectionID: section._id });
    }

    console.log(courseDetails.sectionList);

    res.status(200).json(courseDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
