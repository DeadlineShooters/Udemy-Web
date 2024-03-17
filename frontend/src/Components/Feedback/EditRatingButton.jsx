import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ViewReview from "./ViewReview";
import React from "react";
import StarRatings from "../StarRatings";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

function EditRatingButton({ review }) {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <Modal>
        {review ? (
          <div className="flex flex-col items-end " onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <StarRatings rating={review.rating} />

            <span className="text-sm">
              {hover ? (
                <div className="flex flex-col">
                  <Modal.Open opens="view-review">
                    <span className="hover:text-purple-600">View Rating</span>
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
        <Modal.Window name="view-review">{review ? <ViewReview review={review} /> : <ReviewForm />}</Modal.Window>
        <Modal.Window name="edit-review">
          <ReviewForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditRatingButton;
