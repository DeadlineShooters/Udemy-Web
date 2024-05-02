import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { createImageFromInitials } from "../Utils/Utils";

const ProfileCard = ({ instructor }) => {
  console.log("instructor in profile card: ", instructor);
  return (
    <div className="bg-white   mb-5">
      <div>
        <a href={`/user/${instructor._id}`} className="text-xl font-bold text-purple-800 underline">
          {instructor.firstName + " " + instructor.lastName}
        </a>

        <p className="text-sm text-gray-500 mb-2">{instructor.instructor?.headline}</p>
      </div>
      <div className="flex items-center mb-2">
        <img
          className="h-24 w-24 rounded-full mr-5"
          src={instructor.avatar ? instructor.avatar.public_id : createImageFromInitials(160, instructor.firstName + " " + instructor.lastName)}
          alt="Ozan Ilhan"
        />
        <div className="stats flex flex-col">
          <div className="reviews flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <span className="mr-1">{instructor.instructor.totalReviews}</span> <span>Reviews</span>
          </div>
          <div className="reviews flex items-center">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            <span className="mr-1">{instructor.instructor.totalStudents}</span> <span>Students</span>
          </div>
        </div>
      </div>
      <div className="bio">{instructor.instructor.bio}</div>
    </div>
  );
};

export default ProfileCard;
