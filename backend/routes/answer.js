import express from "express";
import * as answers from '../controllers/answer.js'
import catchAsync from "../utils/catchAsync.js";

const router = express.Router({ mergeParams: true });

router.get('', catchAsync(answers.getAnswers));

router.post('', catchAsync(answers.addAnswer));

router.patch('/:answerId', catchAsync(answers.updateAnswer));

router.delete('/:answerId', catchAsync(answers.deleteAnswer));

export default router;