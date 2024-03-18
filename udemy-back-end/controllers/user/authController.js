import mongoose from "mongoose";
import user from "../../models/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const signup = async (req, res) => {
    try {
        console.log("Tai khoan user:", req.body);
        const {fullName, email, password} = req.body;
        const existingUser = await user.findOne({email});
        if (existingUser) {
            console.log("Found existing user with email:", email);
            return res.status(400).send({ success: false, messages: "Email has been already registered!" });
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new user();
            newUser.lastName = fullName;
            newUser.email = email;
            newUser.hashedPassword = hash;
            
            await newUser.save();
            return res.status(200).send({ success: true, message: "Account created successfully" });
        }
    } catch (err) {
        console.log("Registration error:", err);
        res.status(500).json({ messages: "Registration failed" });
    }
}

export const signin = async (req, res) => {{
    try {
        const {email, password} = req.body;
        const existingUserWithEmail = await user.findOne({email});
        if (existingUserWithEmail) {
            const isMatchPassword = bcrypt.compare(password, existingUserWithEmail.hashedPassword);
            if (isMatchPassword) {
                return res.status(200).json({success: true, existingUserWithEmail});
            } else {
                return res.status(400).send("User logins unsuccessfully");
            }
        }
    } catch (err) {
        console.log("Login error:", err);
        res.status(500).json({ messages: "Login  failed" });
    }
}}