import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import arrow_down from "../../../Assets/arrow_down.png";
import arrow_up from "../../../Assets/arrow_up.png";
import ReactPlayer from "react-player";
import CourseOverview from "../Overview/Overview";
import CompQA from "../../../Components/QA/CompQA";
import axios from "axios";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import logo from '../../../Assets/Udemy_logo_dark.png';
import more_actions_2 from "../../../Assets/more_actions_2.png";
import star from "../../../Assets/star.png";
import share from "../../../Assets/share.png";
import archive from "../../../Assets/archive.png";
import CircleProgressBar from '../../../Components/Utils/ProgressBar.jsx';
import "./Content.css";
import { useAuth } from "../../../AuthContextProvider.jsx";
import secureLocalStorage from "react-secure-storage";

const CourseContent = () => {
  const [user, setUser] = useState();
  const [courseOverall, setCourseOverall] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [slugName, setSlugName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(0);
  const [selectedLectures, setSelectedLectures] = useState({});
  const [courseProgress, setCourseProgress] = useState(0);
  const initialExpandedSections = {};

  useEffect(() => {
    const storedUser = secureLocalStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setCourseOverall(JSON.parse(storedCourse));
    }
  }, []);

  useEffect(() => {
    if (courseOverall) {
      setCourseProgress(courseOverall.progress);
    }
  }, [courseOverall]);

  useEffect(() => {
    const url = window.location.href;
    const [, , , , slugName, , tail] = url.split("/");
    const [lectureIndex, hash] = tail.split("#");
    axios.post("http://localhost:5000/user/course/section/lecture", { lectureIndex, slugName })
      .then((response) => {
        if (response.data.success) {
          setCourseDetails(response.data.data.course[0]);
          setSlugName(slugName);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after data fetching is done
      });
  }, []);

  useEffect(() => {
    if (courseDetails) {
      const initialExpandedSections = {};
      courseDetails.sectionList.forEach(section => {
        initialExpandedSections[section.index] = true;
      });
      setExpandedSections(initialExpandedSections);
    }
  }, [courseDetails]);

  const localNavigate = useNavigate();
  const handleOverviewClick = () => {
    localNavigate(window.location.pathname + '#overview');
  };

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
            setVideoUrl(response.data.data[0].video.secureURL);
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
  const handleLectureClick = async (videoUrl, courseSlug, lectureIndex) => {
    setVideoUrl(videoUrl);
    const currentHash = window.location.hash;
    navigate(`/course/${courseSlug}/learn/${lectureIndex}${currentHash}`, {state: {course: courseDetails}});
  };

  const [QAlistOfLecture, setQAlistOfLecture] = useState();

  const handleQAClick = () => {
    localNavigate(window.location.pathname + '#QA');
  };

  const updateCourseProgress = (selected) => {
    const increment = selected ? 1 : -1;
    let storedCourse = JSON.parse(localStorage.getItem('selectedCourse'));
    const newProgress = (currentLecture +  increment / storedCourse.course.totalLecture) * 100;
    storedCourse.progress = newProgress;
    localStorage.setItem('selectedCourse', JSON.stringify(storedCourse));
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const handleCheckboxChange = (lectureIndex) => {
    setSelectedLectures(prevState => ({
      ...prevState,
      [lectureIndex]: !prevState[lectureIndex]
    }));
  };

  useEffect(() => {
    const updateProgress = async () => {
      try {
        const viewedLectures = Object.keys(selectedLectures).map(lectureIndex => ({
          lecture: lectureIndex,
          viewed: selectedLectures[lectureIndex]
        }));
        const userId = user?._id;
        const courseId = courseDetails?._id;
        await axios.post("http://localhost:5000/user/course/update-progress", {
          userId,
          courseId,
          viewLectures: viewedLectures
        }).then((response) => {
          if (response.data.success) {
            localStorage.setItem('selectedCourse', JSON.stringify(response.data.data.course));
            setCourseOverall(response.data.data.course);
            setCourseProgress(response.data.data.course.progress);
          }
        })
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    };
    updateProgress();
  }, [selectedLectures]);

  useEffect(() => {
    const getViewedLectures = () => {
      const storedCourse = JSON.parse(localStorage.getItem("selectedCourse"));
      if (storedCourse && storedCourse.lectures) {
        const lecturesMap = storedCourse.lectures.reduce((acc, lecture) => {
          acc[lecture.lecture] = lecture.viewed;
          return acc;
        }, {});
        setSelectedLectures(lecturesMap);
      }
    };
    getViewedLectures();
  }, []);

  return (
    <div>
      <div className='header'>
        <div className='courseNavBar'>
          <div class='leftBar flex items-center'>
            <Link to="/"><img src={logo} alt='' class='logo'></img></Link>
            <ul class="mx-5 text-white">
                <a href='/course/:courseId' ><li class="text-lg hover:text-gray-300">{courseDetails?.name}</li></a>
            </ul>
          </div>
          <div className='rightBar flex items-center'>
            <ul class="flex flex-row">
              <li class='flex flex-row items-center'>
                <img class="h-6 w-6" src={star}></img>
                <p class='text-gray-200 hover:text-gray-300 mx-2'>Leave a rating</p>
              </li>
              <li class='flex flex-row items-center'>
                <div><CircleProgressBar progress={courseProgress}/></div>
                {courseProgress === 100 ? 
                  <p class='text-gray-200 hover:text-gray-300 mx-2' onClick={() => navigate(`/course/${courseDetails.slugName}/certificate/${courseOverall.certificate}`)}>Get certificate</p> : 
                  <p class='text-gray-200 hover:text-gray-300 mx-2'>Your progress</p> 
                }
              </li>
            </ul>
            <Menu as="div" className="relative ml-4">
              <div>
                <Menu.Button className="relative flex p-2 border border-gray-200 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img id="preview" src={more_actions_2} alt="profile-pic" class="h-5 w-5"/>
                </Menu.Button>
              </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <div className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row items-center px-4 py-2 text-sm text-gray-700')}>
                          <img src={share} alt='share' class='h-5 w-5 mr-5'/>
                          <a href="/user/public-profile">
                            Share this course
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row items-center px-4 py-2 text-sm text-gray-700')}>
                          <img src={archive} alt='share' class='h-5 w-5 mr-5'/>
                          <a href="/user/public-profile">
                            Archive this course
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
              </Transition>
            </Menu>
          </div> 
        </div>
        <div class='divider'>
          <hr/>
        </div>
      </div>
      <div class="flex flex-row">
      {!loading ? (
          <div class="flex flex-col">
            <ReactPlayer controls={true} url={videoUrl} height="603px" width="1072px" />
            <div className="flex flex-row my-3">
              <div className={` ${window.location.hash === '#overview' ? "text-[rgb(109,60,208)]" : "black"} font-bold hover:text-[#382660] text-lg mx-5 cursor-pointer`} onClick={handleOverviewClick}>Overview</div>
              <div className="font-bold hover:text-[#382660] text-lg mx-5 cursor-pointer" onClick={handleQAClick}>QA</div>
            </div>
            {window.location.hash === '#overview' && <CourseOverview/>}
            {window.location.hash === '#QA' && <CompQA/>}
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
          {courseDetails?.sectionList?.map((section, index) => (
            <div key={index}>
              <div class="flex flew-row border justify-between items-center cursor-pointer" onClick={() => toggleSection(section.index)}>
                <p class="font-bold text-base my-3 ml-5">
                  Section {index + 1}: {section.name}
                </p>
                <img
                  src={expandedSections[section.index] ? arrow_up : arrow_down}
                  alt={expandedSections[section.index] ? "up-arrow" : "down-arrow"}
                  class="w-5 h-5 mr-5"
                ></img>
              </div>
              <div class={`${expandedSections[section.index] ? "flex flex-col" : "hidden"} ml-5 cursor-pointer`}>
                {section.lectureList.map((lecture, indexLecture) => (
                  <div
                    key={lecture.index}
                    class={`${selectLecture[lecture.index] ? "bg-gray-300" : ""} hover:bg-slate-200 flex flex-row items-center z-10`}
                    onClick={() => {
                      {
                        handleLectureClick(lecture.video.secureURL, slugName, lecture.index);
                      }
                      if (!selectLecture[lecture.index]) {
                        toggleSelectLecture(lecture.index);
                        updateCourseProgress(true);
                      } else {
                        updateCourseProgress(false);
                      }
                    }}
                  >
                    <input
                      id={lecture.index}
                      type="checkbox"
                      checked={selectedLectures[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5"
                    />
                    <p className="p-2">
                      {index + 1}.{indexLecture + 1} {lecture.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;