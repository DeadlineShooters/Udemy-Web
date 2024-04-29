import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Content.css";
import arrow_down from "../../../Assets/arrow_down.png";
import arrow_up from "../../../Assets/arrow_up.png";
import ReactPlayer from "react-player";
import CourseOverview from "../Overview/Overview";
import CompQA from "../../../Components/QA/CompQA";
import { useCourse } from "../../../CourseContextProvider";
import axios from "axios";

const CourseContent = () => {
  const {state} = useLocation();
  const [courseDetails, setCourseDetais] = useState(state.course);
  const [slugName, setSlugName] = useState("");
  useEffect(() => {
    const saveLatestCourse = () => {
      localStorage.setItem('storedCourses', JSON.stringify(state.course));
    }
    saveLatestCourse();
  }, []);
  useEffect(() => {
    const getLatestCourse = () => {
      const storedCourses = JSON.parse(localStorage.getItem('storedCourses')) || [];
      setCourseDetais(storedCourses);
      setSlugName(storedCourses.slugName);
    }
    getLatestCourse();
  }, []);

  const localNavigate = useNavigate();
  const handleOverviewClick = () => {
    localNavigate(window.location.pathname + '#overview');
  };

  const initialExpandedSections = {};
    courseDetails.sectionList.forEach(section => {
      initialExpandedSections[section.index] = true; // Initialize each section as collapsed
  });

  const [expandedSections, setExpandedSections] = useState(initialExpandedSections);
  const toggleSection = (sectionID) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionID]: !prevState[sectionID],
    }));
  };
  const [videoUrl, setVideoUrl] = useState("");
  const initialSelectLecture = JSON.parse(localStorage.getItem("selectLecture")) || {};
  const [selectLecture, setSelectLecture] = useState(initialSelectLecture);


  const toggleSelectLecture = (lectureID) => {
    setSelectLecture((prevState) => ({
      [lectureID]: !prevState[lectureID],
    }));
  };

  useEffect(() => {
    const getLatestVideo = () => {
      if (!selectLecture) {
        setVideoUrl(courseDetails.sectionList[0].lectureList[0].video.secureURL);
      }
      else {
        const lectureIndex = Object.keys(selectLecture)[0];
        axios.post("http://localhost:5000/user/course/section/lecture", {lectureIndex})
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.lecture);
            setVideoUrl(response.data.lecture[0].video.secureURL);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
    getLatestVideo();
  }, []);
  useEffect(() => {
    localStorage.setItem("selectLecture", JSON.stringify(selectLecture));
  }, [selectLecture]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLectureClick = (videoUrl, courseSlug, lectureIndex) => {
    setLoading(true);
    setVideoUrl(videoUrl);
    navigate(`/course/${courseSlug}/learn/${lectureIndex}`, {state: {course : courseDetails}});
    setLoading(false);
  };
  const [QAlistOfLecture, setQAlistOfLecture] = useState();
  const handleQAClick = () => {
    localNavigate(window.location.pathname + '#QA');
  };
  return (
    <div class="flex flex-row">
      {!loading ? (
        <div class="flex flex-col">
          <ReactPlayer controls={true} url={videoUrl} height="603px" width="1072px" />
          <div className="flex flex-row my-3">
            <div className={` ${window.location.hash === '#overview' ? "text-[rgb(109,60,208)]" : "black"} font-bold hover:text-[#382660] text-lg mx-5 cursor-pointer`} onClick={handleOverviewClick}>Overview</div>
            <div className="font-bold hover:text-[#382660] text-lg mx-5 cursor-pointer" onClick={handleQAClick}>QA</div>
          </div>
          {window.location.hash === '#overview' && <CourseOverview course={courseDetails} />}
          {window.location.hash === '#QA' && <CompQA QA={QAlistOfLecture}/>}
        </div>
      ) : (
        <div role="status" class="flex flex-col bg-slate-900 items-center justify-center" style={{ height: "603px", width: "3560px" }}>
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <div class="flex flex-col w-full">
        <div class="flex flew-row border">
          <p class="font-bold text-xl my-5 ml-5">Course content</p>
        </div>
        {courseDetails.sectionList.map((section, indexSection) => (
          <div key={indexSection}>
            <div class="flex flew-row border justify-between items-center cursor-pointer" onClick={() => toggleSection(section.index)}>
              <p class="font-bold text-base my-3 ml-5">
                Section {indexSection + 1}: {section.name}
              </p>
              <img
                src={expandedSections[section.indexSection] ? arrow_up : arrow_down}
                alt={expandedSections[section.indexSection] ? "up-arrow" : "down-arrow"}
                class="w-5 h-5 mr-5"
              ></img>
            </div>
            <div class={`${expandedSections[section.indexSection] ? "flex flex-col" : "hidden"} ml-5 cursor-pointer`}>
              {section.lectureList.map((lecture, indexLecture) => (
                <div
                  key={lecture.index}
                  class={`${selectLecture[lecture.index] ? "bg-gray-300" : ""} hover:bg-slate-200 flex flex-row items-center z-10`}
                  onClick={() => {
                    {
                      handleLectureClick(lecture.video.secureURL, slugName, lecture.index);
                    }
                    toggleSelectLecture(lecture.index, section.index);
                  }}
                >
                  <input
                    id={lecture.index}
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5"
                  />
                  <p className="p-2">
                    {indexSection + 1}.{indexLecture + 1} {lecture.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;