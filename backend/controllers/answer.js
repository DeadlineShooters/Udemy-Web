import Question from '../models/question.js';
import Course from '../models/course.js';
import ExpressError from '../utils/ExpressError.js';
import Answer from '../models/answer.js';

export const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default page is 1, default limit is 10

  checkQuestionExist(questionId);

  const skip = (page - 1) * limit;

  const answers = await Answer.find({ question: questionId }).skip(skip).limit(parseInt(limit));

  res.status(200).json(answers);
}
export const addAnswer = async (req, res) => {
  const { questionId } = req.params;
  const userId = req.get("user_id")
  console.log(questionId)

  checkQuestionExist(questionId);

  const answer = new Answer(req.body);
  answer.question = questionId;
  answer.user = userId;
  const savedAnswer = await answer.save();

  res.status(200).json({
    message: "Answer created successully",
    answer: savedAnswer
  });
}

export const updateAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;
  console.log("@UpdateAnswer: ", answerId)

  checkQuestionExist(questionId);

  const updatedAnswer = await Answer.findByIdAndUpdate(answerId, req.body, { new: true });

  if (!updatedAnswer) {
    return res.status(404).json({ message: "answer not found" });
  }

  res.status(200).json({
    message: "Answer updated successfully",
    answer: updatedAnswer
  });
}

export const deleteAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;
  console.log("@DeleteAnswer: ", answerId)

  checkQuestionExist(questionId);

  // Find the answer
  const answer = await Answer.findById(answerId);

  if (!answer) {
    return res.status(404).json({ message: "Answer not found" });
  }

  // Delete the answer
  await Answer.findByIdAndDelete(answerId);

  res.status(200).json({ message: "Answer deleted successfully" });
};


const checkQuestionExist = async (questionId) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ExpressError(404, "questionId not found")
  }
}