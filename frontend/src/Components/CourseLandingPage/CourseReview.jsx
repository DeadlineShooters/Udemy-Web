import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "../StarRatings";
import moment from "moment";
import InstructorResponse from "../CourseFeedback/InstructorResponse";

const CourseReview = ({ review }) => {
  console.log("review in course review: ", review);
  return (
    <div className="bg-white  border-t border-3 py-5">
      <div id="user-review">
        <div className="flex items-center mb-3">
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
            <span className="text-white text-lg font-bold">{review.userID.firstName[0] + review.userID.lastName[0]}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-black text-lg font-bold">{review.userID.firstName + " " + review.userID.lastName[0] + "."}</span>
            <div className="flex items-center ">
              <StarRatings rating={review.rating} />
              <span className="ms-3 text-lg">{moment(review.createdTime).fromNow()}</span>
            </div>
          </div>
        </div>
        <p className="text-lg">{review.feedback}</p>
      </div>
      {review.instructorResponse && <InstructorResponse response={review.instructorResponse} parent={"student-feedback"} />}
    </div>
  );
};

export default CourseReview;
