import Question from '../models/question.js';
import Course from '../models/course.js';
import ExpressError from '../utils/ExpressError.js';
import Answer from '../models/answer.js';

export const getAnswers = async (req, res) => {
  console.log("@getAnswers: ")
  const { questionId } = req.params;
  const { page = 1, limit = 100 } = req.query; // Default page is 1, default limit is 10

  await checkQuestionExist(questionId);

  const skip = (page - 1) * limit;

  const answers = await Answer.find({ question: questionId }).skip(skip).limit(parseInt(limit)).populate('user');

  res.status(200).json(answers);
}
export const addAnswer = async (req, res) => {
  const { questionId } = req.params;
  const userId = req.get("user_id")
  if (!userId) {
    throw new ExpressError(404, "missing user_id in header")
  }
  console.log("@addAnswer: "+questionId)

  await checkQuestionExist(questionId);

  const answer = new Answer(req.body);
  answer.question = questionId;
  answer.user = userId;
  const savedAnswer = await answer.save();

  const question = await Question.findById(questionId);
  // Update the question's answers array
  question.answers.push(savedAnswer._id);
  await question.save();

  res.status(200).json({
    message: "Answer created successully",
    answer: savedAnswer
  });
}

export const updateAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;
  console.log("@UpdateAnswer: ", answerId)

  await checkQuestionExist(questionId);

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

  await checkQuestionExist(questionId);

  // Find the answer
  const answer = await Answer.findById(answerId);

  if (!answer) {
    return res.status(404).json({ message: "Answer not found" });
  }

  // Delete the answer
  await Answer.findByIdAndDelete(answerId);

  const question = await Question.findById(questionId);
  // Remove the answer ID from the question's answers array
  const answerIndex = question.answers.indexOf(answerId);
  if (answerIndex !== -1) {
    question.answers.splice(answerIndex, 1);
  }
  // Save the updated question
  await question.save();

  res.status(200).json({ message: "Answer deleted successfully" });
};


const checkQuestionExist = async (questionId) => {
  if (!questionId) {
    throw new ExpressError(404, "questionId invalid")
  }
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ExpressError(404, "questionId not found")
  }
}