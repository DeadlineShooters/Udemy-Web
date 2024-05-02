import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const StarRatings = ({ rating }) => {
  const totalStars = 5;
  const solidStars = Math.round(rating);
  const regularStars = totalStars - solidStars;

  return (
    <div className="flex text-sm flex-row">
      {[...Array(solidStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStarSolid} className="text-yellow-500 text-lg" />
      ))}
      {[...Array(regularStars)].map((_, i) => (
        <FontAwesomeIcon key={i + solidStars} icon={faStarRegular} className="text-yellow-500 text-lg" />
      ))}
    </div>
  );
};

export default StarRatings;
