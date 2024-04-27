import express from "express";
import * as instructorController from "../../controllers/instructor/manageCourse.js";

const router = express.Router();
router.post("/create-course", instructorController.createCourse);
router.post("/get-course", instructorController.getCourse);
router.put("/:courseId/update-course", instructorController.updateCourse);
router.put("/:courseId/update-section", instructorController.updateSection);
export default router;