import fs from "fs";
import mongoose from "mongoose";
import course from "./models/course.js";
import section from "./models/section.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config({ path: "../.env" });

async function importSectionData() {
  // Read the JSON file
  const data = fs.readFileSync("./data/sections.json", "utf-8");

  // Parse the data as JSON
  const sections = JSON.parse(data);

  // Insert the data into the database
  await section.insertMany(sections);
  console.log("Section data inserted");
}

async function deleteSectionData() {
  // Delete the data from the database
  await section.deleteMany({});
  console.log("Section data deleted");
}

async function importClassData() {
  // Read the JSON file
  const data = fs.readFileSync("./data/courses.json", "utf-8");

  // Parse the data as JSON
  let courses = JSON.parse(data);

  // Convert sectionList strings to ObjectIds
  courses = courses.map((course) => ({
    ...course,
    sectionList: course.sectionList.map((id) => new mongoose.Types.ObjectId(id)),
  }));

  // Insert the data into the database
  await course.insertMany(courses);

  console.log("Class data inserted");
}

async function deleteClassData() {
  // Delete the data from the database
  await course.deleteMany({});
  console.log("Class data deleted");
}

// Connect to the database
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

if (process.argv[2] === "--delete-data") {
  await deleteSectionData();
  await deleteClassData();
} else {
  await importSectionData();
  await importClassData();
}
