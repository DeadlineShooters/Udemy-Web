import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { failureNotify, successNotify } from "../../utils/helpers";

// for both edit and create review
const ReviewForm = ({ setReload, reviewToEdit, courseId, userId, onCloseModal }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  console.log("review in review form: ", reviewToEdit);

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setReview(reviewToEdit.feedback);
    }
  }, [reviewToEdit]);

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if rating is larger than 0
    if (rating > 0) {
      const reviewData = {
        courseID: reviewToEdit ? reviewToEdit.courseID : courseId,
        userID: reviewToEdit ? reviewToEdit.userID : userId,
        feedback: review,
        rating: rating,
      };

      try {
        if (reviewToEdit) {
          // If reviewToEdit is defined, update the existing review
          const response = await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/feedback`, reviewData);
          console.log("Updated review:", response.data);
          setReload((prevState) => !prevState);
        } else {
          // If reviewToEdit is not defined, create a new review
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/feedback`, reviewData);
          console.log("Created review:", response.data);
          setReload((prevState) => !prevState);
        }

        successNotify("Review saved successfully");

        onCloseModal();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      failureNotify("Please select a rating before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-5">{reviewToEdit ? "Your Review" : "Leave a review"}</h1>
      <div className="mb-5">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon className="text-amber-500 text-3xl" key={i} icon={i < rating ? faStarSolid : faStarRegular} onClick={() => handleRatingClick(i + 1)} />
        ))}
      </div>
      <textarea value={review} onChange={handleReviewChange} className="text-xl border border-gray-500 mb-4 p-2" style={{ width: "37vw", height: "20vh" }} placeholder="Enter your review here..." />
      <div className="flex flex-row justify-end w-full ">
        <button type="submit" className="bg-black text-white font-bold px-2 py-1">
          Save
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
