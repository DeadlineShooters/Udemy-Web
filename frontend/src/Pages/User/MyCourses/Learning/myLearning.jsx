import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import './myLearning.css';
import course_placeholder1 from "../../../../Assets/Course.jpg";
import course_placeholder2 from "../../../../Assets/Course2.png";
import course_placeholder3 from "../../../../Assets/Course3.jpg";
import course_overlay from "../../../../Assets/CourseOverlay.png";
import more_actions from "../../../../Assets/more_actions.png";
import share from "../../../../Assets/share.png";
import archive from "../../../../Assets/archive.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EditRatingButton from "../../../../Components/Feedback/EditRatingButton";
import { IconDotsVertical } from '@tabler/icons-react';
import { useAuth } from '../../../../AuthContextProvider';
import {useCourse} from '../../../../CourseContextProvider';
import axios from "axios";

const MyLearning = () => {
  const {userData} = useAuth();
  const userId = userData._id;
  const [courseList, setCourseList] = useState([]);
  const [detailCourse, setDetailCourse] = useState();
  const {setSelectedCourse} = useCourse();

  useEffect(() => {
    const getCourse = () => {
      axios.get(`http://localhost:5000/user/${userId}/get-course/all`)
        .then((response) => {
          if (response.data.success) {
            setCourseList(response.data.courseList);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
      });
    };
    getCourse();
  }, []);

  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const review = {
    rating: 4,
    feedback: "Very thorough course with many quizzes for you to test your knowledge",
  };

  const courseContentNavigation = async (course) => {
    await axios.get(`http://localhost:5000/user/${userId}/get-course/${course.course._id}/detail`)
      .then((response) => {
        if (response.data.success) {
          setSelectedCourse(course);
          localStorage.setItem('selectedCourse', JSON.stringify(course));
          const selectLecture = JSON.parse(localStorage.getItem('selectLecture'));
          const lectureKey = selectLecture ? Object.keys(selectLecture)[0] : null;
          if (!lectureKey) {
            const newRecentVideoId = response.data.course.sectionList[0].lectureList[0].index;
            const saveKey = { [newRecentVideoId]: "true" };
            localStorage.setItem('selectLecture', JSON.stringify(saveKey));
            navigate(`/course/${response.data.course.slugName}/learn/${newRecentVideoId}#overview`, {state: {course: response.data.course}});
          } else {
            navigate(`/course/${response.data.course.slugName}/learn/${lectureKey}#overview`, {state: {course: response.data.course}});
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <div className="upper-mylearning">
          <h1 className="title text-5xl max-sm:text-4xl font-bold pt-10 pb-10">My learning</h1>
          <div className='filter flex items-center'>
            <button className="text-white border-b-8 hover:bg-purple-900 font-bold py-2 rounded text-lg max-sm:text-base">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button className="text-white lg:border-b-8 hover:bg-purple-900 border-[#151b32] font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button className="text-white lg:border-b-8 hover:bg-purple-900 border-[#151b32] font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/archived">Archived</Link>
            </button>
          </div>
      </div>
      <div className="lower-wishlist cardContainer mx-auto flex flex-col">
      {courseList.length > 0 ?    
      (<div>
        <form class="functionbar flex flex-row items-end justify-end w-full ml-auto pb-8 px-2">
          <div className="filter flex flex-row items-center px-5">
            <span className='mr-2'>Filter by:</span>
            <select className="p-2 text-md hover:bg-gray-200 border border-gray-400 rounded-lg">
              <option value="all">All Courses</option>
              <option value="favorites">Favorites</option>
            </select>
          </div>
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div class="relative flex items-center">
            <input
              type="search"
              id="default-search"
              class="block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search my course..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-1 bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg class="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </form>
          {courseList.map((oneCourse, index) => (
            <div className="justify-center md:justify-start flex flex-wrap">
              <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
                <div className='relative'>
                  <img class="" src={oneCourse.course.thumbNail.secureURL} alt="" />
                  <div className='overflow-hidden absolute top-0 left-0 opacity-0 hover:opacity-100' onClick={() => courseContentNavigation(oneCourse)}>
                    <img className='h-full object-cover w-full' src={course_overlay} alt='course placeholder' />
                  </div>
                  <div className='rounded-md absolute top-0 right-0 mt-2 mr-2 w-12 h-12'>
                      <Menu as="div" className="relative ml-6">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:ring-2">
                            <IconDotsVertical stroke={2} className='bg-white'/>
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
                                  <div className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row items-center px-4 py-2 text-sm text-gray-700')}>
                                    <img src={share} alt='share' className='h-5 w-5 mr-5'/>
                                    <a href="/user/public-profile">
                                      Share link
                                    </a>
                                  </div>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <div className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row items-center px-4 py-2 text-sm text-gray-700')}>
                                    <img src={archive} alt='share' className='h-5 w-5 mr-5'/>
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
                <div class="flex flex-col gap-1 pt-1.5">
                  <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">{oneCourse.course.name}</h3>
                  <p class="text-xs truncate text-gray-500">{oneCourse.course.instructor.firstName + " " + oneCourse.course.instructor.lastName}</p>     
                </div>
                {oneCourse.progress > 0 ? (
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-3 dark:bg-gray-700">
                      <div className="bg-blue-600 h-[2px] rounded-full" style={{width: (oneCourse.progress) + "%"}}></div>
                      <p className='text-slate-500  text-sm'>{(oneCourse.progress.toPrecision(4))}% Complete</p>
                    </div>
                  <div className="flex flex-row items-start justify-end mt-1">
                    {index !== 3 ? <EditRatingButton review={review} /> : <EditRatingButton />}
                  </div>
                </div>) : ( 
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-3 dark:bg-gray-700">
                    <div className="bg-blue-600 h-[2px] rounded-full" style={{width: (oneCourse.progress * 100) + "%"}}></div>
                    <p className='text-sm'>START COURSE</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className='flex flex-col items-center my-20'>
            <h2 className='text-xl font-bold'>Explore a plethora of courses and expand your knowledge.</h2>
            <h2 className='flex flex-row text-xl'><p className='text-[#5037b5] font-bold mr-2 underline hover:cursor-pointer' onClick={() => navigate("/")}>Visit Discover</p>to uncover new learning opportunities.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyLearning