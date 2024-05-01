import React, { useEffect, useState } from "react";
import DashboardHeaderTitle from "../../Components/DashboardHeaderTitle";
import Review from "../../Components/CourseFeedback/Review";
import { useAuth } from "../../AuthContextProvider";
import axios from "axios";

// Dummy data
const reviews = [
  {
    id: "112",
    firstName: "John",
    lastName: "Doe",
    date: "2024-03-17",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    feedback: "Great course!",
    courseName: "The Complete 2024 Software Testing Bootcamp ",
    courseThumbnail: "",
    instructorResponse: {
      firstName: "Ngoc",
      lastName: "Pham",
      content: "Thank you",
      createdTime: "2024-03-18",
    },
  },
  {
    id: "1123",
    firstName: "John",
    lastName: "Doe",
    date: "2024-03-17",
    avatar: "https://via.placeholder.com/150",
    rating: 4,
    feedback: "Great course!",
    courseName: "The Complete 2024 Software Testing Bootcamp",
    courseThumbnail: "",
  },
  // Add more review objects here...
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { userData } = useAuth();

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/instructor/${userData._id}`); // Replace with your API endpoint
        setReviews(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    getFeedbacks();
  }, []);

  return (
    <DashboardHeaderTitle title={"Reviews"}>
      {reviews.length > 0 && (
        <div className="flex items-end filter-container pb-3 text-xl">
          <div className="flex items-center mr-8">
            <input type="checkbox" id="notResponded" class="form-checkbox h-6 w-6 mr-2" />

            <label htmlFor="notResponded">Not Responded</label>
          </div>

          <div className="flex items-center mr-8">
            <input type="checkbox" id="alreadyResponded" class="form-checkbox h-6 w-6 mr-2" />

            <label htmlFor="alreadyResponded">Already Responded</label>
          </div>

          <div className="flex flex-col filter-container mr-8">
            <span>Rating</span>
            <select className="p-2 text-md hover:bg-gray-200 border border-black text-xl">
              <option value="all">All</option>
              <option value="favorites">1 star</option>
              <option value="favorites">2 star</option>
              <option value="favorites">3 star</option>
              <option value="favorites">4 star</option>
              <option value="favorites">5 star</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-grow flex-col justify-center mt-3 text-xl">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            // Render your review component here using 'review' data
            return <Review key={review.id} reviewParam={review} />;
          })
        ) : (
          <span>No reviews found</span>
        )}
      </div>
    </DashboardHeaderTitle>
  );
};

export default Reviews;
