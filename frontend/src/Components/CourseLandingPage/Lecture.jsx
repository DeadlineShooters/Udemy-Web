import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const Lecture = ({ title, duration }) => (
  <div className="lecture flex justify-between ">
    <div className="flex items-center">
      <FontAwesomeIcon icon={faPlay} className="mr-3 border border-black p-1" />
      <span>{title}</span>
    </div>
    <span className="text-gray-400">{formatDuration(duration)}</span>
  </div>
);

export default Lecture;
