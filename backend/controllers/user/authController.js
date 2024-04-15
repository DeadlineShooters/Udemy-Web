import mongoose from "mongoose";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const signup = async (req, res) => {
    try {
        console.log("Tai khoan user:", req.body);
        const {firstName, lastName, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("Found existing user with email:", email);
            return res.status(400).send({ success: false, messages: "Email has been already registered!" });
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.hashedPassword = hash;
            
            await newUser.save();
            return res.status(200).send({ success: true, message: "Account created successfully", userData: newUser });
        }
    } catch (err) {
        console.log("Registration error:", err);
        res.status(500).json({ messages: "Registration failed" });
    }
}

export const signin = async (req, res) => {{
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});
        if (userData) {
            const isMatchPassword = await bcrypt.compare(password, userData.hashedPassword);
            if (isMatchPassword) {
                return res.status(200).json({success: true, userData});
            } else {
                return res.status(400).json({success: false});
            }
        }
    } catch (err) {
        console.log("Login error:", err);
        res.status(500).json({ messages: "Login  failed" });
    }
}}