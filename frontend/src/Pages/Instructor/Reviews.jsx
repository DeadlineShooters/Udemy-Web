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
    courseName: "The Complete 2024 Software Testing Bootcamp ",
    courseThumbnail: "https://cdn.discordapp.com/attachments/973498508793503745/1217696152044961852/2151486_095a_6.jpg?ex=6604f6ea&is=65f281ea&hm=2c883878c56eeeccff8c64f989924f67a38678a3e4254290d7c09392b68b6d86&",
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
    courseThumbnail:
      "https://cdn.discordapp.com/attachments/973498508793503745/1217696152044961852/2151486_095a_6.jpg?ex=6604f6ea&is=65f281ea&hm=2c883878c56eeeccff8c64f989924f67a38678a3e4254290d7c09392b68b6d86&",
  },
  // Add more review objects here...
];

const Reviews = () => {
  return (
    <DashboardHeaderTitle title={"Reviews"}>
      <div className="flex items-end  filter-container pb-3">
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
      <div className="flex flex-grow flex-col justify-center mt-3 ">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            // Render your review component here using 'review' data
            return <Review key={review.id} review={review} />;
          })
        ) : (
          <span>No reviews found</span>
        )}
      </div>
    </DashboardHeaderTitle>
  );
};

export default Reviews;