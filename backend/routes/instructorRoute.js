import express from "express";
import * as instructorController from "../controllers/instructorController.js";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";

const router = express.Router();
router.get("/:id", catchAsync(instructorController.getProfile));

export default router;