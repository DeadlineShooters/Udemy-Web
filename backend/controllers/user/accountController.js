import mongoose, { model } from "mongoose";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import Instructor from "../../models/instructor.js";
import Course from "../../models/course.js";
import Lecture from "../../models/lecture.js";
const saltRounds = 10;

export const editProfile = async (req, res) => {
  try {
    // Extract the updated user data from req.body
    console.log("Update request for user data: ", req.body);
    const { userId, userFirstName, userLastName, userHeading, userBio, userWeb, userFb, userYtb } = req.body;
    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Assuming req.user contains the authenticated user's information
      {
        $set: {
          firstName: userFirstName,
          lastName: userLastName,
          bio: userBio,
          header: userHeading,
          socialLinks: {
            web: userWeb,
            facebook: userFb,
            youtube: userYtb,
          },
        },
      },
      { new: true } // Return the updated document
    );
    // Check if user is found and updated
    if (updatedUser) {
      // If successful, send the updated user data as response
      res.status(200).json(updatedUser);
    } else {
      // If user is not found, send a 404 Not Found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const becomeInstructor = async (req, res) => {
  try {
    const { userId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Assuming req.user contains the authenticated user's information
      {
        $set: {
          instructor: {
            headline: "",
            totalReviews: 0,
            totalStudents: 0,
            bio: "",
          },
        },
      },
      { new: true } // Return the updated document
    );
    if (updatedUser) {
      // If successful, send the updated user data as response
      res.status(200).json(updatedUser);
    } else {
      // If user is not found, send a 404 Not Found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const changePassword = async (req, res) => {
  try {
    console.log("Password: ", req.body);
    const { userId, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId, // Assuming req.user contains the authenticated user's information
      {
        $set: {
          hashedPassword: hash,
        },
      },
      { new: true }
    );
    // Check if user is found and updated
    if (updatedUser) {
      // If successful, send the updated user data as response
      res.status(200).json(updatedUser);
    } else {
      // If user is not found, send a 404 Not Found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming the user ID is passed as a parameter
    // Find the user by ID and populate the courseList with fully populated course documents
    const user = await User.findById(userId).populate({
      path: "courseList",
      populate: {
        path: "course",
        model: "Course",
        populate: {
          path: "instructor",
          model: "User",
        },
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Extract courseList from user document
    const courseList = user.courseList;
    console.log("course list", courseList);
    if (courseList) {
      return res.status(200).send({ success: true, message: "Course list found successfully", courseList: courseList });
    } else {
      return res.status(400).send({ success: false, message: "Course list found failed" });
    }
  } catch (error) {
    console.error("Error fetching course list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCourseToFavorites = async (req, res) => {
  const { userId, courseId } = req.params;

  console.log("adding course ", courseId, "to user's favorites", userId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is already in the favorite courses
    if (!user.favoritesCourse.includes(courseId)) {
      user.favoritesCourse.push(courseId);
      await user.save();
      return res.status(200).json({ success: true, message: "Course added to favorite courses successfully" });
    } else {
      return res.status(400).json({ success: false, message: "This course is already in your favorite courses." });
    }
  } catch (error) {
    console.error("Error adding course to favorite courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeCourseFromFavorites = async (req, res) => {
  const { userId, courseId } = req.params;

  console.log("removing course ", courseId, "from user's favorites", userId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is in the favorite courses
    if (user.favoritesCourse.includes(courseId)) {
      user.favoritesCourse = user.favoritesCourse.filter((id) => id != courseId);
      await user.save();
      return res.status(200).json({ success: true, message: "Course removed from favorite courses successfully" });
    } else {
      return res.status(400).json({ success: false, message: "This course is not in your favorite courses." });
    }
  } catch (error) {
    console.error("Error removing course from favorite courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchFavoriteStatus = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is in the user's favorite courses
    const isFavorite = user.favoritesCourse.includes(courseId);

    return res.status(200).json({ success: true, isFavorite: isFavorite });
  } catch (error) {
    console.error("Error fetching favorite status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOneCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate({
        path: "sectionList",
        model: "Section",
        populate: {
          path: "lectureList",
          model: "Lecture",
        },
      })
      .populate({ path: "instructor", model: "User" });
    console.log("user get course here: ", course);
    if (course) {
      return res.status(200).send({ success: true, message: "Course found successfully", course: course });
    } else {
      return res.status(400).send({ success: false, message: "Course found failed" });
    }
  } catch (error) {
    console.error("Error fetching course list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExactLecture = async (req, res) => {
    try {
        const {lectureIndex, slugName} = req.body;
        if (!slugName) {
            const lecture = await Lecture.find({index: lectureIndex});
            if (lecture) {
                return res.status(200).send({ success: true, message: "Lecture found successfully", data: lecture });  
            } else {
                return res.status(400).send({ success: false, message: "Lecture found failed"});  
            }
        } else {
            const course = await Course.find({slugName: slugName}).populate({
                path: 'sectionList',
                model: 'Section',
                populate: {
                    path: 'lectureList',
                    model: 'Lecture',
                }
            }).populate({path: "instructor", model: "User"});
            const lecture = await Lecture.find({index: lectureIndex});
            const returnData = {course, lecture};
            if (lecture) {
                return res.status(200).send({ success: true, message: "Lecture found successfully", data: returnData });  
            } else {
                return res.status(400).send({ success: false, message: "Lecture found failed"});  
            }
        }
    } catch (error) {
        console.error('Error fetching course list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateCourseProgress = async (req, res) => {
    try {
        const { userId, courseId, viewLectures } = req.body;
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // Find the course in the user's courseList array
        const course = user.courseList.find(courseItem => courseItem.course.toString() === courseId);
        // Find the overall course has total lectures field
        const overallCourse = await Course.findById(courseId);
        // Get the total lectures
        const totalLectures = overallCourse.totalLecture;
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found for the user" });
        }
        // Update the progress & viewed list of the course
        const viewedLecturesCount = viewLectures.filter(lecture => lecture.viewed).length;
        const progress = (viewedLecturesCount / totalLectures) * 100;
        course.progress = progress;
        course.lectures = viewLectures;
        await user.save();
        const data = {user, course};
        return res.status(200).json({ success: true, message: "Progress updated successfully", data});
    } catch (error) {
        console.error("Error updating progress:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
} 