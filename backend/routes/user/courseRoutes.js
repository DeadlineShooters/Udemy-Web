import express from "express";
const router = express.Router();

router.route("/").post(createCourse);
export default router;
