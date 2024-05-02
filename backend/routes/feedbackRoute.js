import express from "express";
import controller from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/:courseID", controller.getFeedback);
router.get("/instructor/:instructorID", controller.getInstructorFeedback);
router.get("/:courseID/:userID", controller.getSingleFeedback);
router.post("/", controller.createFeedback);
router.post("/:feedbackID/response", controller.addInstructorResponse);
router.put("/", controller.updateFeedback);
router.delete("/:courseID/:userID", controller.deleteFeedback);

export default router;
