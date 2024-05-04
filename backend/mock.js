import mongoose from "mongoose";
import Course from "./models/course.js";
import Question from "./models/question.js";
import Answer from "./models/answer.js";
const ObjectId = mongoose.Types.ObjectId;

// Connect to MongoDB
mongoose.connect('mongodb+srv://tomato09:u9QmHK8hdYT9LKB6@cluster0.vd8vtog.mongodb.net/udemy-tomato09?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;


// Mock data
const courseData = [
  {
    title: 'Course 1',
    questions: [
      { title: 'Question 1', description: 'Description for Question 1', answerCount: 3 },
      { title: 'Question 2', description: 'Description for Question 2', answerCount: 3 },
      { title: 'Question 3', description: 'Description for Question 3', answerCount: 10 },
    ],
  },
  {
    title: 'Course 2',
    questions: [
      { title: 'Question 1', description: 'Description for Question 1', answerCount: 3 },
      { title: 'Question 2', description: 'Description for Question 2', answerCount: 3 },
      { title: 'Question 3', description: 'Description for Question 3', answerCount: 3 },
    ],
  },
];

async function createMockData() {
  try {
    // Delete all existing questions and their associated answers
    await Question.deleteMany({});
    await Answer.deleteMany({});
    
    const courseId = "6635a078ddb253c2d1f995ad";

    for (const course of courseData) {

      for (const question of course.questions) {
        const newQuestion = await Question.create({
          course: courseId,
          title: question.title,
          description: question.description,
        });

        const answers = [];
        for (let i = 0; i < question.answerCount; i++) {
          const newAnswer = await Answer.create({
            user: new ObjectId(), // Replace with actual user ID
            content: `Answer ${i + 1} for ${question.title}`,
            question: newQuestion._id, // Assign the question ID to the answer
          });
          answers.push(newAnswer); // Push the new answer to the answers array
        }

        // Update the question with the array of answer IDs
        await Question.findByIdAndUpdate(newQuestion._id, { answers: answers.map(a => a._id) });
      }
    }

    console.log('Mock data created successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}


// Run the script
createMockData();
