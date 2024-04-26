import express from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import "./passport.js";
import authRoute from "./routes/user/authRoute.js";
import courseRoute from "./routes/user/courseRoutes.js";
import passport from "passport";
import cors from "cors";
import chalk from "chalk";

import dotenv from "dotenv";
import accountRoute from "./routes/user/accountRoute.js"
import courseRoute from './routes/course/courseRoute.js';
import cloudinary from "cloudinary";
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
try {
  await mongoose.connect(mongoURI);
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database", error);
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
    name: "session",
    keys: ["tomato"],
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

const PORT = 5000;
app.listen(5000, () => {
  console.log(chalk.green(`Server is running on port ${chalk.cyan(PORT)}`));
});
