import express from "express";
import controller from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/:courseID", controller.getFeedback);
router.get("/:courseID/:userID", controller.getSingleFeedback);
router.post("/create", controller.createFeedback);
export default router;
