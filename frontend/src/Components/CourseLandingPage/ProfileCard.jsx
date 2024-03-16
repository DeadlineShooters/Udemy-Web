import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ instructor_fullname, headline, noReviews, noStudents, profileImg }) => {
  return (
    <div className="bg-white   mb-5">
      <div>
        <a href={"/user/ozan-ilha"} className="text-xl font-bold text-purple-800 underline">
          {instructor_fullname}
        </a>

        <p className="text-sm text-gray-500 mb-2">{headline}</p>
      </div>
      <div className="flex items-center mb-2">
        <img className="h-24 w-24 rounded-full mr-5" src={profileImg} alt="Ozan Ilhan" />
        <div className="stats flex flex-col">
          <div className="reviews flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <span className="mr-1">{noReviews}</span> <span>Reviews</span>
          </div>
          <div className="reviews flex items-center">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            <span className="mr-1">{noStudents}</span> <span>Students</span>
          </div>
        </div>
      </div>
      <div className="bio">
        <p>
          I have been a professional software tester for the last 10 years. During my career, I have worked for many major companies such as Payconiq
          International (Amsterdam), Qardio B.V (Amsterdam), EnergyPages (Brussels), Dogus Technology (Istanbul), and QNB Finansbank (Istanbul).
        </p>
        <br />
        <p>I have personally taught many people and helped them become successful in software testing.</p>
      </div>
    </div>
  );
};

export default ProfileCard;
