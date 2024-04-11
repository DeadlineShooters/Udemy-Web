import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Lecture = ({ title, duration }) => (
  <div className="lecture flex justify-between ">
    <div className="flex items-center">
      <FontAwesomeIcon icon={faPlay} className="mr-3 border border-black p-1" />
      <span>{title}</span>
    </div>
    <span className="text-gray-400">{duration}</span>
  </div>
);

export default Lecture;
