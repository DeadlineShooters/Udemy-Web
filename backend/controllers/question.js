import Question from '../models/question.js';
import Course from '../models/course.js';
import ExpressError from '../utils/ExpressError.js';
import Answer from '../models/answer.js';

// Get questions with optional search query
export const getQuestions = async (req, res) => {
  console.log("@getQuestions: ")
  const { courseId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default page is 1, default limit is 10

  await checkCourseExist(courseId);

  const skip = (page - 1) * limit;

  let query = Question.find({ course: courseId })
      .populate('user');

  // Add search functionality
  if (req.query.search) {
      console.log("@search")
      // Create a case-insensitive regex pattern for the search query
      const searchRegex = new RegExp(req.query.search, "i");
      // Update the query to search for titles that match the search query
      query = query.find({ title: searchRegex });
  }

  // Sorting based on creation date
  if (req.query.sort === 'desc') {
      query = query.sort({ createdAt: -1 }); // Ascending order (oldest first)
  }

  const questions = await query.skip(skip).limit(parseInt(limit));

  res.status(200).json(questions);
};

export const getOne = async (req, res) => {
  console.log("@getOne: ");
  const { courseId, questionId } = req.params;

  await checkCourseExist(courseId);

  // Find the question by ID
  const question = await Question.findById(questionId)
    .populate('user')

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.status(200).json(question);
}
export const addQuestion = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.get("user_id")
  if (!userId) {
    throw new ExpressError(404, "missing user_id in header")
  }

  await checkCourseExist(courseId);

  const question = new Question(req.body);
  question.course = courseId;
  question.user = userId;
  const savedQuestion = await question.save();

  res.status(200).json({
    message: "Question created successully",
    question: savedQuestion
  });
}

export const updateQuestion = async (req, res) => {
  const { courseId, questionId } = req.params;

  await checkCourseExist(courseId);

  const updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, { new: true }).populate('user');

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

  await checkCourseExist(courseId);

  // Find the question
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Delete the question (and associated answers will be deleted due to middleware)
  await Question.findByIdAndDelete(question._id);

  res.status(200).json({ message: "Question deleted successfully" });
};


const checkCourseExist = async (courseId) => {
  if (!courseId) {
    throw new ExpressError(404, "courseId is invalid");
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ExpressError(404, "courseId not found")
  }
}