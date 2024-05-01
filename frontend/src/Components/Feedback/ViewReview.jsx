import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {StarRatings} from "../StarRatings";

const ViewReview = ({ review, onCloseModal }) => {
  return (
    <div className=" ">
      <h2 className="text-lg font-bold mb-5">Your Review</h2>
      <StarRatings rating={review.rating} />
      <p className="mt-4">{review.feedback}</p>
      <div className="flex flex-row justify-end mt-5">
        <button>
          <span className="px-3 py-2 bg-black font-bold text-white ">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ViewReview;
