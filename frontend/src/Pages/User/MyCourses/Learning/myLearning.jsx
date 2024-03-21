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

const MyLearning = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const courses = [{
    title: "Software design for beginners (2024)",
    img: course_placeholder1,
    instructor: "FIT HCMUS",
    progress: 1/8,
  }, {
    title: "Introduction to Python (newest version, 2024)",
    img: course_placeholder2,
    instructor: "Tomato Group",
    progress: 1/7,
  }, {
    title: "Data visualization with Kibana",
    img: course_placeholder3,
    instructor: "Onee Academy",
    progress: 0,
  }, ]
  return (
    <div>
      <div className="upper-mylearning">
          <h1 className="title text-5xl max-sm:text-4xl font-bold pt-10 pb-10">My learning</h1>
          <div className='filter flex items-center'>
            <button className="text-white border-b-8 font-bold py-2 rounded text-lg max-sm:text-base">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button className="text-white lg:border-b-8 border-slate-900 font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button className="text-white lg:border-b-8 border-slate-900 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/archived">Archived</Link>
            </button>
          </div>
      </div>
      <div className="lower-mylearning">
        <form className="searchbar flex flex-row max-sm:flex-col justify-end items-end my-3 mx-5">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="flex flex-col filter-container mr-8 max-sm:mr-0 max-sm:mb-3">
            <span>Filter by</span>
            <select className="p-2 text-md hover:bg-gray-200 border border-gray-400 rounded-lg">
              <option value="all">All Courses</option>
              <option value="favorites">Favorites</option>
            </select>
          </div>
          <div className="relative w-80 max-sm:w-72">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search my course..." required />
            <button type="submit" className="text-white absolute end-1 bottom-1 bg-violet-950 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <div className='flex flex-wrap justify-center m-auto w-full mt-5'>
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
                    <div className='rounded-md absolute top-0 right-0 mt-6 mr-2 w-12 h-12 z-9999'>
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
                    <p className='text-lg md:text-lg font-bold mt-2'>{course.title}</p>
                  </div>
                  <div>
                    <p className='text-slate-500 text-base mt-3'>{course.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: (course.progress * 100) + "%"}}></div>
                    </div>
                    <p className='text-slate-500 text-base mt-3'>{(course.progress.toPrecision(4) * 100)}% Complete</p>
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