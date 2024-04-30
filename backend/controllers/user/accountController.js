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
        const { userId, userFirstName, userLastName, userHeading, userBio, userWeb, userFb, userYtb} = req.body;
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
                        youtube: userYtb
                    } 
                } 
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
}

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
                        bio: ""
                    },
                } 
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
        console.log("Error", error)
    }
}

export const changePassword = async (req, res) => {
    try {
        console.log("Password: ", req.body);
        const {userId, password} = req.body;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId, // Assuming req.user contains the authenticated user's information
            { 
                $set: {
                    hashedPassword: hash
                }
            },
            { new: true},
        )
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
}

export const getCourse = async (req, res) => {
    try {
        const {userId} = req.params; // Assuming the user ID is passed as a parameter
        // Find the user by ID and populate the courseList with fully populated course documents
        const user = await User.findById(userId).populate({
            path: 'courseList',
            populate: {
                path: 'course',
                model: 'Course',
                populate: {
                    path: 'instructor',
                    model: 'User',
                }
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Extract courseList from user document
        const courseList = user.courseList;
        console.log("course list", courseList);
        if (courseList) {
            return res.status(200).send({ success: true, message: "Course list found successfully", courseList: courseList });  
        } else {
            return res.status(400).send({ success: false, message: "Course list found failed"});  
        }
    } catch (error) {
        console.error('Error fetching course list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOneCourse = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate({
            path: 'sectionList',
            model: 'Section',
            populate: {
                path: 'lectureList',
                model: 'Lecture',
            }
        }).populate({path: "instructor", model: "User"});;
        console.log("user get course here: ", course);
        if (course) {
            return res.status(200).send({ success: true, message: "Course found successfully", course: course });  
        } else {
            return res.status(400).send({ success: false, message: "Course found failed"});  
        }
    } catch (error) {
        console.error('Error fetching course list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getExactLecture = async (req, res) => {
    try {
        const {lectureIndex} = req.body;
        const lecture = await Lecture.find({index: lectureIndex});
        if (lecture) {
            return res.status(200).send({ success: true, message: "Lecture found successfully", lecture: lecture });  
        } else {
            return res.status(400).send({ success: false, message: "Lecture found failed"});  
        }
    } catch (error) {
        console.error('Error fetching course list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}