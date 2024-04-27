import mongoose from "mongoose";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import Instructor from "../../models/instructor.js";
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