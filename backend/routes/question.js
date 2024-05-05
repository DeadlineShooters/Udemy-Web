import express from "express";
import * as questions from '../controllers/question.js'
import catchAsync from "../utils/catchAsync.js";

const router = express.Router({ mergeParams: true });

router.get('', catchAsync(questions.getQuestions));

router.get('/:questionId', catchAsync(questions.getOne));

router.post('', catchAsync(questions.addQuestion));

router.put('/:questionId', catchAsync(questions.updateQuestion));

router.delete('/:questionId', catchAsync(questions.deleteQuestion));

export default router;