import React from "react";
import DashboardHeaderTitle from "../../Components/DashboardHeaderTitle";
import Review from "../../Components/CourseFeedback/Review";

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
    courseName: "React.js Course",
    courseThumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "1123",
    firstName: "John",
    lastName: "Doe",
    date: "2024-03-17",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    feedback: "Great course!",
    courseName: "React.js Course",
    courseThumbnail: "https://via.placeholder.com/150",
  },
  // Add more review objects here...
];

const Reviews = () => {
  return (
    <DashboardHeaderTitle title={"Reviews"}>
      <div className="flex items-end  filter-container border-b border-gray-500 pb-3">
        <div className="flex items-center mr-8">
          <input type="checkbox" id="notResponded" className="mr-2" />
          <label htmlFor="notResponded">Not Responded</label>
        </div>

        <div className="flex items-center mr-8">
          <input type="checkbox" id="alreadyResponded" className="mr-2" />
          <label htmlFor="alreadyResponded">Already Responded</label>
        </div>

        <div className="flex flex-col filter-container mr-8">
          <span>Rating</span>
          <select className="p-2 text-md hover:bg-gray-200 border border-black">
            <option value="all">All</option>
            <option value="favorites">1 star</option>
            <option value="favorites">2 star</option>
            <option value="favorites">3 star</option>
            <option value="favorites">4 star</option>
            <option value="favorites">5 star</option>
          </select>
        </div>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          // Render your review component here using 'review' data
          return <Review key={review.id} review={review} />;
        })
      ) : (
        <div className="flex justify-center mt-3">No reviews found</div>
      )}
    </DashboardHeaderTitle>
  );
};

export default Reviews;
