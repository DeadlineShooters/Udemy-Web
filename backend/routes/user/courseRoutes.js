import express from "express";
import controller from "../../controllers/courseController.js";
const router = express.Router();

router.route("/").post(controller.createCourse);
router.get("/:id", controller.getCourseById);

export default router;
