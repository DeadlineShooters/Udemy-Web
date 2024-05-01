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
    const feedback = await Feedback.findOne(query).exec();

    console.log("feedback found: ", feedback);
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

  console.log("Creating new feedback: " + courseID + " " + userID);
  try {
    const newFeedback = new Feedback({
      courseID: new mongoose.Types.ObjectId(courseID),
      userID: new mongoose.Types.ObjectId(userID),
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

controller.deleteFeedback = async (req, res) => {
  const { courseID, userID } = req.params;

  console.log("Deleting feedback: " + courseID + " " + userID);
  try {
    // Find the feedback and delete it
    const feedback = await Feedback.findOneAndDelete({
      courseID: new mongoose.Types.ObjectId(courseID),
      userID: new mongoose.Types.ObjectId(userID),
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Find the course and update the star counts and average rating
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the star counts
    if (feedback.rating === 5) {
      course.fiveStarCnt -= 1;
    } else if (feedback.rating === 4) {
      course.fourStarCnt -= 1;
    } else if (feedback.rating === 3) {
      course.threeStarCnt -= 1;
    } else if (feedback.rating === 2) {
      course.twoStarCnt -= 1;
    } else if (feedback.rating === 1) {
      course.oneStarCnt -= 1;
    }

    // Update the average rating
    const totalRatings = course.fiveStarCnt * 5 + course.fourStarCnt * 4 + course.threeStarCnt * 3 + course.twoStarCnt * 2 + course.oneStarCnt;
    const totalResponses = course.fiveStarCnt + course.fourStarCnt + course.threeStarCnt + course.twoStarCnt + course.oneStarCnt;
    course.avgRating = totalResponses > 0 ? totalRatings / totalResponses : 0;

    await course.save();

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete feedback" });
  }
};

controller.saveFeedback = async (req, res) => {
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

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error("Error in saveFeedback:", error);
    res.status(500).send("Feedback could not be saved");
  }
};

controller.updateFeedback = async (req, res) => {
  const { courseID, userID, feedback, rating } = req.body;

  try {
    const existingFeedback = await Feedback.findOne({ courseID, userID });

    if (existingFeedback) {
      // Update the fields
      existingFeedback.feedback = feedback;
      existingFeedback.rating = rating;

      // Save the updated document
      const updatedFeedback = await existingFeedback.save();

      res.status(200).json(updatedFeedback);
    } else {
      res.status(404).send("Feedback not found");
    }
  } catch (error) {
    console.error("Error in updateFeedback:", error);
    res.status(500).send("Feedback could not be updated");
  }
};

export default controller;
