import Feedback from "../models/feedbackModel.js";
import { PAGE_SIZE } from "../utils/constants.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const controller = {};

controller.getFeedback = async (req, res) => {
  const { courseID } = req.params;
  const { page = 1, rating } = req.query; // default is first page if not provided

  console.log("Rating: " + rating);
  // PAGINATION
  const skip = (page - 1) * PAGE_SIZE;
  console.log("Get feedback for course " + courseID);

  // QUERY
  let query = { courseID: new mongoose.Types.ObjectId(courseID) }; // retrieves documents where courseID matches

  // If a rating filter is applied, add it to the query
  if (rating !== "null") {
    query.rating = Number(rating);
  }

  try {
    const feedbacks = await Feedback.find(query).skip(skip).limit(PAGE_SIZE).populate("userID").exec();

    const count = await Feedback.countDocuments(query);

    res.json({ feedbacks, count }); // Send the response
  } catch (error) {
    console.log("Error in getFeedback:", error);
    res.status(500).send("Feedback could not be loaded"); // Send an error response
  }
};

controller.getInstructorFeedback = async (req, res) => {
  const { instructorID } = req.params;

  try {
    // Find all courses created by the instructor
    const courses = await Course.find({ instructor: new mongoose.Types.ObjectId(instructorID) }).exec();

    // Extract the course IDs
    const courseIDs = courses.map((course) => course._id);

    // Find all feedback for these courses
    const feedbacks = await Feedback.find({ courseID: { $in: courseIDs } })
      .populate(["userID", "courseID"])
      .exec();

    res.json({ feedbacks }); // Send the response
  } catch (error) {
    console.log("Error in getInstructorFeedback:", error);
    res.status(500).send("Feedback could not be loaded"); // Send an error response
  }
};

controller.addInstructorResponse = async (req, res) => {
  const { feedbackID } = req.params;
  const { instructorId, content } = req.body;

  try {
    // Find the feedback by ID
    let feedback = await Feedback.findById(feedbackID);

    // Create a new response
    const response = {
      instructorId: new mongoose.Types.ObjectId(instructorId),
      content: content,
      createdTime: Date.now(),
    };

    // Add the response to the feedback
    feedback.instructorResponse = response;

    // Save the updated feedback
    await feedback.save();

    // Populate courseID and userID
    feedback = await Feedback.findById(feedback._id).populate("courseID").populate("userID");

    res.json({ feedback }); // Send the response
  } catch (error) {
    console.log("Error in addInstructorResponse:", error);
    res.status(500).send("Response could not be added"); // Send an error response
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
      res.status(200).json({ feedback }); // Send the response
    } else {
      res.status(404).json({ message: "No feedback found", status: 404 }); // Send an error response
    }
  } catch (error) {
    console.log("Error in getSingleFeedback:", error);
    res.status(500).json({ message: "Feedback could not be loaded", status: 400 }); // Send an error response
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

    // Find the user who is the instructor and update totalReviews
    const user = await User.findById(course.instructor);
    if (user && user.instructor) {
      user.instructor.totalReviews += 1;
      await user.save();
    }

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
    if (feedback.rating === 5 && course.fiveStarCnt > 0) {
      course.fiveStarCnt -= 1;
    } else if (feedback.rating === 4 && course.fourStarCnt > 0) {
      course.fourStarCnt -= 1;
    } else if (feedback.rating === 3 && course.threeStarCnt > 0) {
      course.threeStarCnt -= 1;
    } else if (feedback.rating === 2 && course.twoStarCnt > 0) {
      course.twoStarCnt -= 1;
    } else if (feedback.rating === 1 && course.oneStarCnt > 0) {
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
      // Find the course and update the star counts and average rating
      const course = await Course.findById(courseID);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Decrement the old rating count
      if (existingFeedback.rating === 5 && course.fiveStarCnt > 0) {
        course.fiveStarCnt -= 1;
      } else if (existingFeedback.rating === 4 && course.fourStarCnt > 0) {
        course.fourStarCnt -= 1;
      } else if (existingFeedback.rating === 3 && course.threeStarCnt > 0) {
        course.threeStarCnt -= 1;
      } else if (existingFeedback.rating === 2 && course.twoStarCnt > 0) {
        course.twoStarCnt -= 1;
      } else if (existingFeedback.rating === 1 && course.oneStarCnt > 0) {
        course.oneStarCnt -= 1;
      }

      // Update the fields
      existingFeedback.feedback = feedback;
      existingFeedback.rating = rating;

      // Increment the new rating count
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
      course.avgRating = totalResponses > 0 ? totalRatings / totalResponses : 0;

      await course.save();

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
