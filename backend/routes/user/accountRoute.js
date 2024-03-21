import express from "express";
import passport from "passport";
import * as accountController from "../../controllers/user/accountController.js";
import user from "../../models/user.js";

const router = express.Router();
router.post("http://localhost:5000/user/edit-profile", accountController.editProfile);
router.post("http://localhost:5000/user/change-password", accountController.changePassword);

export default router;