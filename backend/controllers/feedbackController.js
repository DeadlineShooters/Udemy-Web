import Feedback from "../models/feedbackModel.js";
import { PAGE_SIZE } from "../utils/constants.js";
import Course from "../models/course.js";

const controller = {};

controller.getFeedback = async (req) => {
  const { courseID } = req.params;
  const { page = 1 } = req.query; // default is first page if not provided

  // PAGINATION
  const skip = (page - 1) * PAGE_SIZE;
  console.log("Get feedback for course " + courseID);

  // QUERY
  const query = { courseID }; // retrieves documents where courseID matches

  try {
    const data = await Feedback.find(query).skip(skip).limit(PAGE_SIZE).exec();

    const count = await Feedback.countDocuments(query);

    return { data, count };
  } catch (error) {
    console.log("Error in getFeedback:", error);
    throw new Error("Feedback could not be loaded");
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
