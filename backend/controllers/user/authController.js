import mongoose from "mongoose";
import User from "../../models/user.js";
import UserVerification from "../../models/userVerification.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
})

const sendVerificationEmail = ({ _id, email }, res) => {
  const currentURL = "http://localhost:5000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verification Your Email",
    html:
      `<p>Verify your email address to complete the signup and login into your account.</p>
      <p>This link expires in 6 hours.</p>
      <a href=${currentURL + "auth/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
  };
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createAt: Date.now(),
        expiresAt: Date.now() + 216000,
      });
      return newVerification.save().then(() => {
        return transporter.sendMail(mailOptions);
      });
    })
};

export const signup = async (req, res) => {
  try {
    console.log("Tai khoan user:", req.body);
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
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
      await newUser.save().then((result) => {
        sendVerificationEmail(result, res);
      });
      return res.status(200).send({ success: true, message: "Account created successfully", userData: newUser });
    }
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ messages: "Registration failed" });
  }
};

export const verify = async (req, res) => {
  try {
    let {userId, uniqueString} = req.params;
    UserVerification.find({userId}).then((result) => {
      if (result.length > 0) {
        const {expiresAt} = result[0];
        const hashedUniqueString = result[0].uniqueString;
        if (expiresAt < Date.now) {
          UserVerification.deleteOne({userId}).then((result) => {
            User.deleteOne({userId}).then(() => {
              let message = "Link has expired. Please sign up again";
              res.redirect(`http://localhost:3000/user/verified/error/${message}`);
            })
          }).catch((e) =>{
            console.log(e);
            let message = "Clearing user with expired unique string failed"
            res.redirect(`http://localhost:3000/user/verified/error/${message}`);
          })
        } else {
            bcrypt.compare(uniqueString, hashedUniqueString).then((result) => {
              if (result) {
                // string match
                User.updateOne({_id: userId}, {verified: true}).then(() => {
                  UserVerification.deleteOne({userId}).then(() => {
                    res.redirect(`http://localhost:3000/user/verified/success`);
                  }).catch(() => {
                    console.log(error);
                    let message = "A error occured while deleting user verification"
                    res.redirect(`http://localhost:3000/user/verified/error/${message}`);
                  })
                }).catch((error) => {
                  console.log(error);
                  let message = "A error occured while updating user account to show verified"
                  res.redirect(`http://localhost:3000/user/verified/error/${message}`);
                });
              } else {
                let message = "Invalid verification details passed. Check your inbox";
                res.redirect(`http://localhost:3000/user/verified/error/${message}`);
              }
            }).catch((error) => {
            let message = "A error occured while comparing unique strings"
            res.redirect(`http://localhost:3000/user/verified/error/${message}`);
          })
        }
      } else {
        let message = "Account record doesn't exist or has been verified already. Please sign up or login."
        res.redirect(`http://localhost:3000/user/verified/error/${message}`);
      }
    }).catch((error) => {
      console.log(error);
      let message = "A error occured while clearing expired user verification record"
      res.redirect(`http://localhost:3000/user/verified/error/${message}`);
    })
  } catch (e) {
    console.log(e);
    let message = "A error occured while clearing expired user verification record"
    res.redirect(`http://localhost:3000/user/verified/error/${message}`);
  } 
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
  
    // Check if the user exists
    const userData = await User.findOne({ email });
    console.log(userData);
  
    if (userData) {
      // Check if the user is verified
      if (!userData.verified) {
        return res.status(400).json({ success: false, message: "User is not verified" });
      }
      // If user is verified, compare passwords
      const isMatchPassword = await bcrypt.compare(password, userData.hashedPassword);
      if (isMatchPassword) {
        return res.status(200).json({ success: true, userData });
      } else {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.log("Login error:", err);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};
