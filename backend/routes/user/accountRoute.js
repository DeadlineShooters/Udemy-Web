import express from "express";
import passport from "passport";
import * as accountController from "../../controllers/user/accountController.js";
import user from "../../models/user.js";

const router = express.Router();
router.post("/edit-profile", accountController.editProfile);
router.post("/change-password", accountController.changePassword);
router.post("/become-instructor", accountController.becomeInstructor);
router.get("/:userId/get-course/all", accountController.getCourse);
router.get("/:userId/get-course/:courseId/detail", accountController.getOneCourse);
router.post("/course/section/lecture", accountController.getExactLecture);
export default router;