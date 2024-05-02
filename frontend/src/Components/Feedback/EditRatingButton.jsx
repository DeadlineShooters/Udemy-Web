import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ViewReview from "./ViewReview";
import React from "react";
import StarRatings from "../StarRatings";
import ReviewForm from "./ReviewForm";
import { useState, useEffect } from "react";
import axios from "axios";

function EditRatingButton({ review, courseId, userId }) {
  const [reload, setReload] = useState(false);
  const [feedback, setFeedback] = useState(review);
  const [hover, setHover] = useState(false);

  console.log("Reload in edit rating button: " + reload);
  console.log("feedback in edit rating button: ", feedback);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${courseId}/${userId}`);
        const fetchedFeedback = response.data.feedback;
        if (fetchedFeedback) {
          setFeedback(fetchedFeedback); // Update the feedback state with the fetched feedback
        }
      } catch (error) {
        if (error.response.status !== 404) {
          throw error;
        } else {
          setFeedback(null);
        }
      }
    };

    fetchFeedback();
  }, [reload, courseId, userId]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <Modal>
        {feedback ? (
          <div className="flex flex-col items-end " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <StarRatings rating={feedback.rating} />

            <span className="text-sm">
              {hover ? (
                <div className="flex ">
                  <Modal.Open opens="view-review">
                    <span className="hover:text-purple-600 mr-2">View Rating</span>
                  </Modal.Open>
                  <Modal.Open opens="edit-review">
                    <span className="hover:text-purple-600">Edit Rating</span>
                  </Modal.Open>
                </div>
              ) : (
                "Your rating"
              )}
            </span>
          </div>
        ) : (
          <Modal.Open opens="view-review">
            <button className="flex flex-col items-end ">
              <StarRatings rating={0} />
              <span className="text-sm">Leave a rating</span>
            </button>
          </Modal.Open>
        )}
        <Modal.Window name="view-review">{feedback ? <ViewReview review={feedback} setReload={setReload} /> : <ReviewForm setReload={setReload} courseId={courseId} userId={userId} />}</Modal.Window>
        <Modal.Window name="edit-review">
          <ReviewForm reviewToEdit={feedback} setReload={setReload} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditRatingButton;
