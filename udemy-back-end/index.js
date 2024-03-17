import express from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import "./passport.js";
import authRoute from "./routes/authRoute.js";
import passport from "passport";
import cors from "cors";

const mongoURI = "mongodb+srv://tomato09:u9QmHK8hdYT9LKB6@cluster0.vd8vtog.mongodb.net/udemy-tomato09?retryWrites=true&w=majority&appName=Cluster0"
try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database");
    } catch (error) {
    console.log("Could not connect to the database", error);
}

const app = express()
app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["tomato"],
    maxAge: 24*60*60*100,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use("/auth", authRoute);

app.listen(5000, () => {
    console.log("Server is running");
})