import React from 'react';
import { Link, useLocation } from "react-router-dom";
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

const MyLearning = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const review = {
    rating: 4,
    feedback: "Very thorough course with many quizzes for you to test your knowledge",
  };
  const courses = [
    {
      title: "Software design for beginners (2024)",
      img: course_placeholder1,
      instructor: "FIT HCMUS",
      progress: 1 / 8,
      avgRating: 5,
    },
    {
      title: "Introduction to Python (newest version, 2024)",
      img: course_placeholder2,
      instructor: "Tomato Group",
      progress: 1 / 7,
      avgRating: 5,
    },
    {
      title: "Data visualization with Kibana",
      img: course_placeholder3,
      instructor: "Onee Academy",
      progress: 0,
      avgRating: 5,
    },
    {
      title: "Data visualization with Kibana",
      img: course_placeholder3,
      instructor: "Onee Academy",
      progress: 0,
      avgRating: 0,
    },
  ];
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
      <div className="lower-mylearning">
        <div className="flex flex-row ml-auto justify-end items-center">
          <div className="flex flex-row items-center px-5">
            <span className='mr-2'>Filter by:</span>
            <select className="p-2 text-md hover:bg-gray-200 border border-gray-400 rounded-lg">
              <option value="all">All Courses</option>
              <option value="favorites">Favorites</option>
            </select>
          </div>
          <form className="flex flex-row items-end lg:w-1/4 md:w-1/3 px-2">
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
        </div>
        <div className='flex flex-wrap justify-center m-auto w-full'>
          {courses.map((course, index)=> (
            <div key={index} className='card flex flex-col'>
              <div className='rounded-xl shadow-lg flex-grow'>
                <div className='p-3 flex flex-col h-full justify-between'>
                  <div className='rounded-xl overflow-hidden justify-between relative'>
                    <div className='rounded-xl overflow-hidden'>
                      <img className="thumbnail" src={course.img} alt='course placeholder' />
                    </div>
                    <div className='rounded-xl overflow-hidden absolute top-0 left-0 opacity-0 hover:opacity-100'>
                      <a href='/course/:courseId/learn/:videoId'>
                        <img className='thumbnail-shadow' src={course_overlay} alt='course placeholder' />
                      </a>
                    </div>
                    <div className='rounded-md absolute top-0 right-0 mt-6 mr-2 w-12 h-12'>
                      <Menu as="div" className="relative ml-4">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:ring-2">
                            <img id="preview" src={more_actions} alt="profile-pic" className="avatar"/>
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
                                      Share
                                    </a>
                                  </div>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <div className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row items-center px-4 py-2 text-sm text-gray-700')}>
                                    <img src={archive} alt='share' className='h-5 w-5 mr-5'/>
                                    <a href="/user/public-profile">
                                      Archive
                                    </a>
                                  </div>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <p className='text-lg md:text-lg font-bold'>{course.title}</p>
                  </div>
                  <div>
                    <p className='text-slate-500 text-base mt-3'>{course.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: (course.progress * 100) + "%"}}></div>
                    </div>
                      <div className="flex flex-row items-start justify-between mt-3">
                      <p className='text-slate-500  text-sm'>{(course.progress.toPrecision(4) * 100)}% Complete</p>
                        {index !== 3 ? <EditRatingButton review={review} /> : <EditRatingButton />}
                      </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default MyLearning