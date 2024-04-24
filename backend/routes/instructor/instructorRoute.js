import express from "express";
import * as instructorController from "../../controllers/instructor/manageCourse.js";

const router = express.Router();
router.post("/create-course", instructorController.createCourse);

export default router;