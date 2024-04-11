import mongoose from "mongoose";
import course from "../models/course.js";

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
export default controller;
