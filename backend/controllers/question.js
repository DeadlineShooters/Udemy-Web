import Question from '../models/question.js';
import Course from '../models/course.js';
import ExpressError from '../utils/ExpressError.js';
import Answer from '../models/answer.js';

export const getQuestions = async (req, res) => {
  const { courseId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default page is 1, default limit is 10

  checkCourseExist(courseId);

  const skip = (page - 1) * limit;

  try {
    const questions = await Question.find({ course: courseId }).skip(skip).limit(parseInt(limit));

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const addQuestion = async (req, res) => {
  const { courseId } = req.params;

  checkCourseExist(courseId);

  const question = new Question(req.body);
  question.course = courseId;
  const savedQuestion = await question.save();

  res.status(200).json({
    message: "Question created successully",
    question: savedQuestion
  });
}

export const updateQuestion = async (req, res) => {
  const { courseId, questionId } = req.params;

  checkCourseExist(courseId);

  const updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, { new: true });

  if (!updatedQuestion) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.status(200).json({
    message: "Question updated successfully",
    question: updatedQuestion
  });
}

export const deleteQuestion = async (req, res) => {
  const { courseId, questionId } = req.params;

  checkCourseExist(courseId);

  // Find the question
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Delete the question
  await question.remove();

  res.status(200).json({ message: "Question deleted successfully" });
};


const checkCourseExist = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ExpressError(404, "courseId not found")
  }
}