import mongoose from "mongoose";
import Course from "../../models/course.js";
import Category from "../../models/category.js";
import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

import Lecture from "../../models/lecture.js";
import Section from "../../models/section.js";
import User from "../../models/user.js";
dotenv.config();

const controller = {};

controller.courses = async (req, res) => {
  let { category } = req.query;
  console.log("@@category: " + category);
  try {
    let courses;
    if (category) {
      let categoryObj = await Category.findOne({ id: category });
      courses = await Course.find({ category: categoryObj._id }).populate("category").populate("instructor");
    } else {
      courses = await Course.find().populate("category").populate("instructor");
    }
    console.log(courses);
    if (courses.length > 0) {
      res.json({ success: true, courses });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

controller.categories = async (req, res) => {
  try {
    let categories = await Category.find({});
    if (categories.length > 0) {
      res.json({ success: true, categories });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: "elastic",
    password: process.env.ELASTIC_PASSWORD,
  },
});

controller.search = async (req, res) => {
  let { query } = req.query;
  try {
    let search = await client.search({
      query: {
        multi_match: {
          query,
          fields: ["*"],
        },
      },
    });
    let courses = await Promise.all(
      search.hits.hits.map(async (hit) => {
        let course = await Course.findById(new mongoose.Types.ObjectId(hit._source.id)).populate("category").populate("instructor");
        return course;
      })
    );
    courses = courses.filter((course) => course !== null);
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.createCourse = async (req, res) => {
  const { name, category } = req.body;

  try {
    const newCourse = new Course({
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
    let courseDetails = await Course.findById(id).populate("sectionList").populate("instructor");
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
