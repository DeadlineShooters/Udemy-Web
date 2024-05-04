import React, { useState } from "react";
import { IconTrophyFilled } from '@tabler/icons-react';

const CircleProgressBar = ({ progress }) => {
  const [offset, setOffset] = useState(0);
  const circleRef = React.useRef(null);
  const setProgress = (progress) => {
    const offset = 120 - (progress / 100) * 120;
    setOffset(offset);
  };

  React.useEffect(() => {
    setProgress(progress);
  }, [progress]);

  return (
    <div class="flex flex-row items-center">
      <svg className="w-10 h-10">
        <circle
          className="stroke-current text-gray-700"
          strokeWidth="2"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          ref={circleRef}
        />
        {/* Insert your character here */}
        {progress === 100 && <IconTrophyFilled  x="8" y ="8" color="#A334EF"/>}
        <circle
          className="stroke-current text-gray-300"
          strokeWidth="2"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.5s ease 0s",
          }}
        />
      </svg>
    </div>
  );
};

export default CircleProgressBar;