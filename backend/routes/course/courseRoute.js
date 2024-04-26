import express from "express";
import controller from "../../controllers/course/courseController.js";

const router = express.Router();

router.get("/", controller.courses);
router.route("/").post(controller.createCourse);
router.get("/categories", controller.categories);
router.get("/search", controller.search);
router.get("/:id", controller.getCourseById);

export default router;
