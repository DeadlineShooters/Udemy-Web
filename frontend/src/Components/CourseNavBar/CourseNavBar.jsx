import React, {useState, useEffect} from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from "react-router-dom";
import './CourseNavBar.css';
import logo from '../../Assets/Udemy_logo_dark.png';
import more_actions_2 from "../../Assets/more_actions_2.png";
import star from "../../Assets/star.png";
import share from "../../Assets/share.png";
import archive from "../../Assets/archive.png";
import CircleProgressBar from '../Utils/ProgressBar';
import { useCourse } from '../../CourseContextProvider';

const CourseNavbar = () => {
  const {selectedCourse} = useCourse();
  const [courseName, setCourseName] = useState("");
  const [progress, setProgress] = useState();
  useEffect(() => {
    const getLatestCourse = () => {
      const storedCourses = JSON.parse(localStorage.getItem('selectedCourse'));
      setCourseName(storedCourses.course.name);
      setProgress(storedCourses.progress);
    }
    getLatestCourse();
  }, [selectedCourse]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className='header'>
      <div className='courseNavBar'>
        <div class='leftBar flex items-center'>
          <Link to="/"><img src={logo} alt='' class='logo'></img></Link>
          <ul class="mx-5 text-white">
              <a href='/course/:courseId' ><li class="text-lg hover:text-gray-300">{courseName}</li></a>
          </ul>
        </div>
        <div className='rightBar flex items-center'>
          <ul class="flex flex-row">
            <li class='flex flex-row items-center'>
              <img class="h-6 w-6" src={star}></img>
              <p class='text-gray-200 hover:text-gray-300 mx-2'>Leave a rating</p>
            </li>
            <li class='flex flex-row items-center'>
              <div><CircleProgressBar progress={progress}/></div>
              <p class='text-gray-200 hover:text-gray-300 mx-2'>Your progress</p>
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
  )
}

export default CourseNavbar