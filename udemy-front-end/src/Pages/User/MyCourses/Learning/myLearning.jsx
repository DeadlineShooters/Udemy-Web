import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './myLearning.css';
import course_placeholder1 from "../../../../Assets/Course.jpg"
import course_placeholder2 from "../../../../Assets/Course2.png"
import course_placeholder3 from "../../../../Assets/Course3.jpg"

const MyLearning = () => {
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
  }]
  return (
    <div>
      <div className="upper">
          <h1 className="title text-5xl font-bold pt-10 pb-10">My learning</h1>
          <div className='filter flex items-center'>
            <button class="text-white hover:bg-violet-950 border-b-8 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/archived">Archived</Link>
            </button>
          </div>
      </div>
      <div className="lower">
        <form className="searchbar items-end w-1/4 ml-auto">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search my course..." required />
            <button type="submit" class="text-white absolute end-1 bottom-1 bg-violet-950 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <div class='flex justify-center min-h-screen mx-auto mt-5'>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:p-72 lg:pt-0">
            {courses.map((course)=> (
              <div class='card'>
                <div class='rounded-xl shadow-lg min-h-96'>
                  <div class='p-3 flex flex-col'>
                    <div class='rounded-xl overflow-hidden'>
                      <img class='object-fit lg:h-48' src={course.img} alt='course placeholder' />
                    </div>
                    <h5 class='text-lg md:text-lg font-bold mt-2'>{course.title}</h5>
                    <p class='text-slate-500 text-base mt-3'>{course.instructor}</p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
                      <div class="bg-blue-600 h-2 rounded-full" style={{width: (course.progress * 100) + "%"}}></div>
                    </div>
                    <p class='text-slate-500 text-base mt-3'>{(course.progress.toPrecision(4) * 100)}% Complete</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyLearning