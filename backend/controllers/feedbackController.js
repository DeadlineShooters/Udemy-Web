import Feedback from "../models/feedbackModel.js";
import { PAGE_SIZE } from "../utils/constants.js";
import Course from "../models/course.js";
import mongoose from "mongoose";

const controller = {};

controller.getFeedback = async (req, res) => {
  const { courseID } = req.params;
  const { page = 1 } = req.query; // default is first page if not provided

  // PAGINATION
  const skip = (page - 1) * PAGE_SIZE;
  console.log("Get feedback for course " + courseID);

  // QUERY
  const query = { courseID: new mongoose.Types.ObjectId(courseID) }; // retrieves documents where courseID matches

  try {
    const feedbacks = await Feedback.find(query).skip(skip).limit(PAGE_SIZE).populate("userID").exec();

    const count = await Feedback.countDocuments(query);

    res.json({ feedbacks, count }); // Send the response
  } catch (error) {
    console.log("Error in getFeedback:", error);
    res.status(500).send("Feedback could not be loaded"); // Send an error response
  }
};

controller.getSingleFeedback = async (req, res) => {
  const { courseID, userID } = req.params;

  console.log("Get feedback for course " + courseID + " from user " + userID);

  // QUERY
  const query = {
    courseID: new mongoose.Types.ObjectId(courseID),
    userID: new mongoose.Types.ObjectId(userID), // retrieves documents where courseID and userID matches
  };

  try {
    const feedback = await Feedback.findOne(query).populate("userID").exec();

    if (feedback) {
      res.json({ feedback }); // Send the response
    } else {
      res.status(404).send("No feedback found"); // Send an error response
    }
  } catch (error) {
    console.log("Error in getSingleFeedback:", error);
    res.status(500).send("Feedback could not be loaded"); // Send an error response
  }
};

controller.createFeedback = async (req, res) => {
  const { courseID, userID, feedback, rating } = req.body;

  try {
    const newFeedback = new Feedback({
      courseID,
      userID,
      feedback,
      rating,
      createdTime: Date.now(),
    });

    const savedFeedback = await newFeedback.save();

    // Find the course and update the star counts and average rating
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the star counts
    if (rating === 5) {
      course.fiveStarCnt += 1;
    } else if (rating === 4) {
      course.fourStarCnt += 1;
    } else if (rating === 3) {
      course.threeStarCnt += 1;
    } else if (rating === 2) {
      course.twoStarCnt += 1;
    } else if (rating === 1) {
      course.oneStarCnt += 1;
    }

    // Update the average rating
    const totalRatings = course.fiveStarCnt * 5 + course.fourStarCnt * 4 + course.threeStarCnt * 3 + course.twoStarCnt * 2 + course.oneStarCnt;
    const totalResponses = course.fiveStarCnt + course.fourStarCnt + course.threeStarCnt + course.twoStarCnt + course.oneStarCnt;
    course.avgRating = totalRatings / totalResponses;

    await course.save();

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create feedback" });
  }
};

export default controller;
