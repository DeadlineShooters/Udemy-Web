import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { createImageFromInitials } from "../Utils/Utils";

const ProfileCard = ({ instructor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderBio = () => {
    if (instructor.instructor.bio.length > 100 && !isExpanded) {
      return (
        <div className="flex flex-col relative text-lg">
          <div className="overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
            <div className="relative">{instructor.instructor.bio.substring(0, 100)}</div>
          </div>
          <button onClick={toggleExpanded} className="text-purple-600 font-bold text-start">
            Show More
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col text-lg">
          {instructor.instructor.bio}
          {instructor.instructor.bio.length > 100 && (
            <button onClick={toggleExpanded} className="text-purple-600 font-bold text-start">
              Show Less
            </button>
          )}
        </div>
      );
    }
  };
  return (
    <div className="bg-white   mb-5">
      <div>
        <a href={`/user/instructor-profile/${instructor._id}`} className="text-xl font-bold text-purple-800 underline">
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
            <span className="mr-1 text-lg">{instructor.instructor.totalReviews}</span> <span>Reviews</span>
          </div>
          <div className="reviews flex items-center">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            <span className="mr-1 text-lg">{instructor.instructor.totalStudents}</span> <span>Students</span>
          </div>
        </div>
      </div>
      <div className="bio">{renderBio()}</div>
    </div>
  );
};

export default ProfileCard;
