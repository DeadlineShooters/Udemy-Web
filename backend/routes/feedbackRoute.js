import express from "express";
import controller from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", controller.getFeedback);
router.post("/create", controller.createFeedback);
export default router;
