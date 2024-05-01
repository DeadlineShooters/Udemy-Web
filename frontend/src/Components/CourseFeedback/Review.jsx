import React from "react";
import { createImageFromInitials } from "../Utils/Utils";
import StarRatings from "../StarRatings";
import { useState } from "react";
import InstructorResponse from "./InstructorResponse";
import ButtonDefault from "./ButtonDefault";
import moment from "moment";

const instructor = {
  firstName: "Nozo",
  lastName: "Pham",
  heading: "Software engineer",
  description: "",
  email: "tomato09@gmail.com",
};
const Review = ({ reviewParam }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseContent, setResponseContent] = useState("");
  const [review, setReview] = useState(reviewParam);

  console.log("Review current: ", reviewParam);
  const handleSeeResponseClick = () => {
    setShowResponse((prevShowResponse) => !prevShowResponse);
  };

  const handleRespondClick = () => {
    setShowResponseInput(true);
  };

  const handleCancelClick = () => {
    setShowResponseInput(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${review._id}/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instructorId: instructor._id,
          content: responseContent,
        }),
      });

      if (response.ok) {
        const updatedReviewFromServer = await response.json();
        setReview(updatedReviewFromServer.feedback); // Update the review state
        setShowResponseInput(false);
        setShowResponse(true); // Show the response right away
      } else {
        console.error("Failed to save response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex p-4 bg-white shadow rounded-lg items-start justify-between mb-2 ">
      <div className="flex w-4/6 mr-10">
        <img src={createImageFromInitials(160, review.userID.firstName + " " + review.userID.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <div className="font-bold text-gray-500 mr-1 text-lg">{`${review.userID.firstName} ${review.userID.lastName}`}</div>
            <div className="text-lg text-gray-500">• {moment(review.createdTime).fromNow()}</div>
          </div>
          <StarRatings rating={review.rating} />
          <div className="mb-2 mt-2">{review.feedback}</div>
          <div>
            {review.instructorResponse ? (
              <ButtonDefault handleClick={handleSeeResponseClick} text={showResponse ? "HIDE RESPONSE" : "SEE RESPONSE"} />
            ) : (
              <ButtonDefault handleClick={handleRespondClick} text={"RESPOND"} />
            )}
          </div>

          <div className="show-response">
            {review.instructorResponse && showResponse && <InstructorResponse response={review.instructorResponse} />}
            {showResponseInput && (
              <div className="mt-3 flex">
                <img src={createImageFromInitials(160, instructor.firstName + " " + instructor.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />

                <div className="w-full">
                  <textarea placeholder="Add a reply..." className="w-full p-2 border rounded mb-2" value={responseContent} onChange={(e) => setResponseContent(e.target.value)}></textarea>
                  <div className="flex flex-row justify-end">
                    <ButtonDefault handleClick={handleCancelClick} text={"CANCEL"} />
                    <button
                      onClick={handleSaveClick}
                      className="ms-2 text-lg duration-300 ease-in-out hover:text-purple-600 active:bg-gray-200 p-2 active:text-purple-800 text-purple-600 font-bold text-start"
                    >
                      SAVE RESPONSE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end ">
        <img src={review.courseID.thumbNail.secureURL} alt="course thumbnail" className="flex-1 w-10 h-auto rounded-lg mr-2 " />
        <span className="text-lg text-balance inline-block flex-1">{review.courseID.name}</span>
      </div>
    </div>
  );
};

export default Review;
