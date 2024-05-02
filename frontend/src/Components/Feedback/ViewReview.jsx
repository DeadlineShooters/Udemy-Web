import React, { useState } from "react";
import axios from "axios";
import StarRatings from "../StarRatings";

const ViewReview = ({ review, onCloseModal, setReload }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    if (!isDeleted) {
      // Add a delay before deleting the review
      setTimeout(async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${review.courseID}/${review.userID}`);
          console.log("Feedback deleted successfully");
          setReload((prevState) => !prevState); // Toggle reload state
          setIsDeleted(true);
          onCloseModal();
        } catch (error) {
          console.error("Error deleting feedback:", error);
        }
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  if (isDeleting) {
    return (
      <div className=" ">
        <h2 className="text-2xl font-bold mb-5">Delete Your Review?</h2>
        <p className="mt-10 text-xl">Are you sure you want to delete your review?</p>
        <div className="w-auto flex flex-row justify-end mt-10">
          <button onClick={handleDelete}>
            <span className="px-3 py-2 font-bold text-black mr-3 text-xl" onClick={() => setIsDeleting(false)}>
              Cancel
            </span>
          </button>
          <button onClick={handleDelete}>
            <span className="px-3 py-2 bg-black font-bold text-white text-xl" onClick={handleDelete}>
              Yes, Delete My Review
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80">
      <h2 className="text-2xl font-bold mb-5">Your Review</h2>
      <StarRatings rating={review.rating} />
      <p className="mt-4 text-xl">{review.feedback}</p>
      <div className="flex flex-row justify-end mt-5">
        <button onClick={() => setIsDeleting(true)}>
          <span className="px-3 py-2 bg-black font-bold text-white text-lg">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ViewReview;
