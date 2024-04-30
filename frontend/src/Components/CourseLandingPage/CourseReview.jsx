import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "../StarRatings";

const CourseReview = ({ review }) => {
  return (
    <div className="bg-white  border-t py-5">
      <div className="flex items-center mb-5">
        <div
          className="mr-4"
          style={{
            backgroundColor: "black",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="text-white text-md font-bold">{review.userID.firstName[0] + review.userID.lastName[0]}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-black text-md font-bold">{review.userID.firstName + " " + review.userID.lastName[0] + "."}</span>
          <StarRatings rating={review.rating} />
        </div>

        {/* <h3 className="text-lg font-bold">{review.courseName}</h3> */}
      </div>
      <p>{review.feedback}</p>
      <div className="mt-2"></div>
    </div>
  );
};

export default CourseReview;
