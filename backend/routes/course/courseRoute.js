import express from "express";
import controller from "../../controllers/course/courseController.js";

const router = express.Router();

router.get("/", controller.courses);
router.route("/").post(controller.createCourse);
router.get("/categories", controller.categories);
router.get("/search", controller.search);
router.get("/:id", controller.getCourseById);
router.post("/is-enrolled", controller.isEnrolled);
router.post("/is-carted", controller.isCarted);
router.post("/is-wishlisted", controller.isWishlisted);

export default router;
