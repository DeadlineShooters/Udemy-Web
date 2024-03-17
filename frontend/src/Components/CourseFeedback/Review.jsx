import React from "react";
import { createImageFromInitials } from "../Utils/Utils";

const Review = ({ review }) => {
  return (
    <div className="flex p-4 bg-white shadow rounded-lg">
      <div className="flex flex-col flex-grow mr-4">
        <div className="flex items-center mb-2">
          <img src={createImageFromInitials(160, review.firstName + " " + review.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <div className="font-bold">{`${review.firstName} ${review.lastName}`}</div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
        </div>
        <div className="mb-2">
          <div>{review.feedback}</div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Respond</button>
      </div>
      <div className="flex flex-col items-center">
        <img src={review.courseThumbnail} alt="course thumbnail" className="w-20 h-20 rounded-lg mb-2" />
        <div className="font-bold">{review.courseName}</div>
      </div>
    </div>
  );
};

export default Review;
