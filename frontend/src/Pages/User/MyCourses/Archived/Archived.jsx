import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import course_overlay from '../../../../Assets/CourseOverlay.png';
import { IconArchiveFilled, IconArchiveOff  } from '@tabler/icons-react';
import EditRatingButton from '../../../../Components/Feedback/EditRatingButton';
import { IconDotsVertical } from '@tabler/icons-react';
import { useCourse } from '../../../../CourseContextProvider';
import axios from 'axios';
import './Archived.css';
import { useAuth } from '../../../../AuthContextProvider';

const Archived = () => {
  const { userData } = useAuth();
  const userId = userData._id;
  const [courseList, setCourseList] = useState([]);
  const { setSelectedCourse } = useCourse();
  const [archivedCourses, setArchivedCourses] = useState([]);

  useEffect(() => {
    const getArchivedList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user/archived/${userId}`);
      if (response.data.success) {
        setArchivedCourses(response.data.archivedList);
      }
    }
    getArchivedList();
  }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user/${userId}/get-course/all`);
      if (response.data.success) {
        const courseList = response.data.courseList;
        const promises = courseList.map(async (course) => {
          let feedback = null;
          try {
            const feedbackResponse = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${course.course._id}/${userId}`);
            feedback = feedbackResponse.data.feedback;
          } catch (error) {
            if (error.response.status !== 404) {
              throw error;
            }
          }
          return { ...course, feedback };
        });
        const coursesWithFeedback = await Promise.all(promises);
        console.log("Courses with feedback: ", coursesWithFeedback);
        setCourseList(coursesWithFeedback);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, [])

  useEffect(() => {
    const filterArchivedCourses = () => {
      const filteredCourses = courseList.filter((course) => archivedCourses.includes(course.course._id));
      setCourseList(filteredCourses);
    }
    filterArchivedCourses();
  }, [archivedCourses]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const courseContentNavigation = async (course) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/user/${userId}/get-course/${course.course._id}/detail`)
      .then((response) => {
        if (response.data.success) {
          setSelectedCourse(course);
          localStorage.setItem("selectedCourse", JSON.stringify(course));
          const selectLecture = JSON.parse(localStorage.getItem("selectLecture"));
          const lectureKey = selectLecture ? Object.keys(selectLecture)[0] : null;
          if (!lectureKey) {
            const newRecentVideoId = response.data.course.sectionList[0].lectureList[0].index;
            const saveKey = { [newRecentVideoId]: "true" };
            localStorage.setItem('selectLecture', JSON.stringify(saveKey));
            navigate(`/course/${response.data.course.slugName}/learn/${newRecentVideoId}#overview`, {state: {course: response.data.course}});
          } else {
            navigate(`/course/${response.data.course.slugName}/learn/${lectureKey}#overview`, { state: { course: response.data.course } });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClickUnArchived = async (e, courseId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/removeArchivedList/${userId}/${courseId}`);
      if (response.data.success) {
        setArchivedCourses(archivedCourses.filter((id) => id !== courseId));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing course from favorite courses:", error);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="upper-archived">
          <h1 class="title text-5xl font-bold pt-10 pb-10">My learning</h1>
          <div className='filter flex items-center'>
            <button class="text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button class="text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button class="text-white hover:bg-purple-900 border-b-8 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/archived">Archived</Link>
            </button>
          </div>
      </div>
      <div className="lower-wishlist cardContainer mx-auto flex flex-col">
        {archivedCourses.length === 0 ? (
          <div className='flex flex-col items-center my-20'>
            <h2 className='text-xl font-bold'>Focus on only the courses that matter to you.</h2>
            <h2 className='flex flex-row text-xl'><p className='text-[#5037b5] font-bold mr-2 underline hover:cursor-pointer' onClick={() => navigate("/home/my-courses/learning")}>Go to the All Courses</p> tab to archive. </h2>
          </div>
          ) : 
          <div>
           {courseList.map((oneCourse, index) => (
            <div className="justify-center md:justify-start flex flex-wrap">
              <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
                <div className="relative">
                  <img class="" src={oneCourse.course.thumbNail.secureURL} alt="" />
                  <div className="overflow-hidden absolute top-0 left-0 opacity-0 hover:opacity-100" onClick={() => courseContentNavigation(oneCourse)}>
                    <img className="h-full object-cover w-full" src={course_overlay} alt="course placeholder" />
                  </div>
                  <div className="rounded-md absolute top-0 right-0 mt-2 mr-2 w-12 h-12">
                    <Menu as="div" className="relative ml-6">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:ring-2">
                          <IconDotsVertical stroke={2} className="bg-white" />
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
                        <Menu.Items className="absolute right-0 z-9999 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                          <Menu.Item>
                            {({ active }) => (
                              <div className={classNames(active ? "bg-gray-100" : "", "flex flex-row items-center px-4 py-2 text-sm text-gray-700")}>
                                <IconArchiveOff className='h-5 w-5 mr-3' color='#000000'/>
                                <a
                                  href="/home/my-courses/learning"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClickUnArchived(e, oneCourse.course._id);
                                  }}
                                >
                                  Unarchive
                                </a>
                              </div>
                            )}
                          </Menu.Item>
                          
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div class="flex flex-col gap-1 pt-1.5">
                  <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">{oneCourse.course.name}</h3>
                  <p class="text-xs truncate text-gray-500">{oneCourse.course.instructor.firstName + " " + oneCourse.course.instructor.lastName}</p>
                </div>
                {oneCourse.progress > 0 ? (
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-3 dark:bg-gray-700">
                      <div className="bg-blue-600 h-[2px] rounded-full" style={{ width: oneCourse.progress + "%" }}></div>
                      <p className="text-slate-500  text-sm">{oneCourse.progress.toPrecision(4)}% Complete</p>
                    </div>

                    <div className="flex flex-row items-start justify-end mt-1">
                      {<EditRatingButton review={oneCourse.feedback ? oneCourse.feedback : null} courseId={oneCourse.course._id} userId={userId} />}
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-3 dark:bg-gray-700">
                    <div className="bg-blue-600 h-[2px] rounded-full" style={{ width: oneCourse.progress * 100 + "%" }}></div>
                    <p className="text-sm">START COURSE</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Archived;