import React, { useEffect, useState } from "react";
import DashboardHeaderTitle from "../../Components/DashboardHeaderTitle";
import Review from "../../Components/CourseFeedback/Review";
import { useAuth } from "../../AuthContextProvider";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { userData } = useAuth();
  const [notResponded, setNotResponded] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(false);
  const [rating, setRating] = useState("all");

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

  const handleNotRespondedChange = (event) => {
    setNotResponded(event.target.checked);
  };

  const handleAlreadyRespondedChange = (event) => {
    setAlreadyResponded(event.target.checked);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Filter reviews based on the state
  const filteredReviews = reviews.filter((review) => {
    let matches = true;
    if (notResponded) {
      matches = matches && review.instructorResponse === undefined; // Replace with your logic
    }
    if (alreadyResponded) {
      matches = matches && review.instructorResponse; // Replace with your logic
    }
    if (rating !== "all") {
      matches = matches && review.rating == rating; // Replace with your logic
    }
    return matches;
  });

  return (
    <DashboardHeaderTitle title={"Reviews"}>
      {reviews.length > 0 && (
        <div className="flex items-end filter-container pb-3 text-xl">
          <div className="flex items-center mr-8">
            <input type="checkbox" id="notResponded" class="form-checkbox h-6 w-6 mr-2" checked={notResponded} onChange={handleNotRespondedChange} />
            <label htmlFor="notResponded">Not Responded</label>
          </div>

          <div className="flex items-center mr-8">
            <input type="checkbox" id="alreadyResponded" class="form-checkbox h-6 w-6 mr-2" checked={alreadyResponded} onChange={handleAlreadyRespondedChange} />
            <label htmlFor="alreadyResponded">Already Responded</label>
          </div>

          <div className="flex flex-col filter-container mr-8">
            <span>Rating</span>
            <select className="px-3 p-2 text-md hover:bg-gray-200 border border-black text-xl" value={rating} onChange={handleRatingChange}>
              <option value="all">All</option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-grow flex-col justify-center mt-3 text-xl">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => {
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
