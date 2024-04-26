import express from "express";
import controller from "../../controllers/course/courseController.js";

const router = express.Router();

router.get("/", controller.courses);
router.get("/categories", controller.categories);
router.get("/search", controller.search);
router.route("/").post(controller.createCourse);
router.get("/:id", controller.getCourseById);

export default router;
