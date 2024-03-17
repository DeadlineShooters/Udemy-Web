import React from "react";
import { createImageFromInitials } from "../Utils/Utils";
import StarRatings from "../StarRatings";
import { useState } from "react";
import InstructorResponse from "./InstructorResponse";

const Review = ({ review }) => {
  const [showResponse, setShowResponse] = useState(false);
  const handleSeeResponseClick = () => {
    setShowResponse((prevShowResponse) => !prevShowResponse);
  };

  return (
    <div className="flex p-4 bg-white shadow rounded-lg items-start justify-between mb-2 ">
      <div className="flex w-3/4 ">
        <img src={createImageFromInitials(160, review.firstName + " " + review.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="font-bold text-gray-500 text-sm mr-1">{`${review.firstName} ${review.lastName}`}</div>
            <div className="text-sm text-gray-500">• {review.date}</div>
          </div>
          <StarRatings rating={review.rating} />
          <div className="mb-2">{review.feedback}</div>
          {review.instructorResponse ? (
            <button onClick={handleSeeResponseClick} className=" text-gray-500 text-sm font-bold rounded text-start">
              {showResponse ? "HIDE RESPONSE" : "SEE RESPONSE"}
            </button>
          ) : (
            <button className=" text-gray-500 text-sm font-bold rounded text-start">RESPOND</button>
          )}

          <div className="show-response">{review.instructorResponse && showResponse && <InstructorResponse response={review.instructorResponse} />}</div>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <img src={review.courseThumbnail} alt="course thumbnail" className="flex-1 w-10 h-auto rounded-lg mr-2 " />
        <span className="text-sm text-balance inline-block flex-1">{review.courseName}</span>
      </div>
    </div>
  );
};

export default Review;
