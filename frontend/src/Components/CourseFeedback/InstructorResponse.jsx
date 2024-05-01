import { useState } from "react";
import { createImageFromInitials } from "../Utils/Utils";
import { useAuth } from "../../AuthContextProvider";
import moment from "moment";

export default function InstructorResponse({ response, parent }) {
  const { userData } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    if (response.content.length > 100 && !isExpanded) {
      return (
        <div className="flex flex-col relative">
          <div className="overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
            <div className="relative">{response.content.substring(0, 100)}</div>
          </div>
          <button onClick={toggleExpanded} className="text-black underline font-bold text-start">
            Show More
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          {response.content}
          {response.content.length > 100 && (
            <button onClick={toggleExpanded} className="text-black underline font-bold text-start">
              Show Less
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col mt-4 justify-between">
      <div className="flex items-start ">
        {parent === "instructor-feedback" && <img src={createImageFromInitials(160, userData.firstName + " " + userData.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />}
        <div className={`flex flex-col border-black ${parent === "student-feedback" ? "border-l-4 pl-3" : ""}`}>
          {parent === "instructor-feedback" && (
            <div className="flex items-center ">
              <div className="font-bold text-gray-700 text-lg mr-1 text-bl">{`${userData.firstName} ${userData.lastName}`}</div>
              <div className="text-lg text-gray-500">• {moment(response.createdTime).fromNow()}</div>
            </div>
          )}
          {parent === "student-feedback" && (
            <div className="flex flex-col">
              <div className="font-bold text-gray-800 text-lg mr-1 text-bl">{`${userData.firstName} ${userData.lastName}`}</div>
              <div className="flex items-center ">
                <div className="font-bold text-gray-600 text-lg mr-1 text-bl">{`Instructor response`}</div>
                <div className="text-lg text-gray-500">• {moment(response.createdTime).fromNow()}</div>
              </div>
            </div>
          )}
          <div className="text-lg">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
