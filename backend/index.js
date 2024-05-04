import express from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import "./passport.js";
import authRoute from "./routes/user/authRoute.js";
import instructorRoute from "./routes/instructorRoute.js";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import accountRoute from "./routes/user/accountRoute.js"
import courseRoute from './routes/course/courseRoute.js';
import cloudinary from "cloudinary";

import questionRoute from './routes/question.js';
import answerRoute from './routes/answer.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
try {
	await mongoose.connect(mongoURI);
	console.log('Connected to the database');
} catch (error) {
	console.log('Could not connect to the database', error);
}

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
app.use(express.json());

app.use(
	cookieSession({
		name: 'session',
		keys: ['tomato'],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	})
);
app.use("/auth", authRoute);
app.use("/user", accountRoute);
app.use('/courses', courseRoute);
app.use("/instructor", instructorRoute);

app.use("/questions/:courseId", questionRoute)
app.use("/questions/:questionId/answers", answerRoute)

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something has gone wrong. Please try to restart or check the internet connection.';
  console.log(err.message);
	res.status(statusCode).json({
		"status": "BAD_REQUEST",
		"error": err
	});
});



app.listen(5000, () => {
	console.log('Server is running');
});
