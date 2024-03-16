import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

// for both edit and create review
const ReviewForm = ({ reviewToEdit, onCloseModal }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-5">Leave a review</h1>
      <div className="mb-5">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon
            className="text-amber-500 text-3xl"
            key={i}
            icon={i < rating ? faStarSolid : faStarRegular}
            onClick={() => handleRatingClick(i + 1)}
          />
        ))}
      </div>
      <textarea
        value={review}
        onChange={handleReviewChange}
        className=" border border-gray-500 mb-4 p-2"
        style={{ width: "37vw", height: "20vh" }}
        placeholder="Enter your review here..."
      />
      <div className="flex flex-row justify-end w-full ">
        <button type="submit" className="bg-black text-white font-bold px-2 py-1">
          Save
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
