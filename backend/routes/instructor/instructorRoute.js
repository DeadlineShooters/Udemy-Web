import express from "express";
import * as instructorController from "../../controllers/instructor/manageCourse.js";
import statsController from "../../controllers/instructor/statsController.js";

const router = express.Router();
router.post("/create-course", instructorController.createCourse);
router.post("/get-course", instructorController.getCourse);
router.put("/:courseId/update-course", instructorController.updateCourse);
router.put("/:courseId/update-section", instructorController.updateSection);

router.post("/stats", statsController.stats);
router.post("/stats-by-month", statsController.statsByMonth);
export default router;