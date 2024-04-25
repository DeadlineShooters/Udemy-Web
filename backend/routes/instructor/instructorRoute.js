import express from "express";
import * as instructorController from "../../controllers/instructor/manageCourse.js";

const router = express.Router();
router.post("/create-course", instructorController.createCourse);
router.post("/get-course", instructorController.getCourse);
export default router;