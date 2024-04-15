import React from "react";
import { useState, useEffect } from "react";
import { Fragment } from 'react';
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import CreateCourseCard from "../../../Components/CourseDashboard/CreateCourseCard";
import ResourceCard from "../../../Components/CourseDashboard/ResourceCard";
import { Button } from "@material-tailwind/react";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Menu, Transition } from '@headlessui/react';
import { getColor, createImageFromInitials } from '../../../Components/Utils/Utils.js';
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from "../../../AuthContextProvider.jsx";
import { Link, useNavigate } from "react-router-dom";

const profileImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";


const CourseDashBoard = () => {
  const { userData } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const res = [
      {
        name: "Learn ReactJS",
        status: "DRAFT",
        thumbnail: profileImage
      },
      {
        name: "Learn ReactJS",
        status: "DRAFT",
        thumbnail: profileImage
      },
      {
        name: "Learn ReactJS",
        status: "DRAFT",
        thumbnail: profileImage
      },
    ]

    setCourses(res);
  }, [])

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // Perform filtering logic based on selected filter
    // alert(filter)
  };
  const haveCourse = true;
  function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
  const logout = () => {
		secureLocalStorage.clear();
		window.open('http://localhost:5000/auth/logout', '_self');
	};
  const resource1 = {
    imgSrc: profileImage,
    title: "Create an Engaging Course",
    desciption: "Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.",
    getStartedUrl: '#',
  }
  const resource2 = {
    imgSrc: profileImage,
    title: "Get Started with Video",
    desciption: "Quality video lectures can set your course apart. Use our resources to learn the basics.",
    getStartedUrl: '#',
  }
  const resource3 = {
    imgSrc: profileImage,
    title: "Build Your Audience",
    desciption: "Set your course up for success by building your audience.",
    getStartedUrl: '#',
  }
  const resource4 = {
    imgSrc: profileImage,
    title: "Join the New Instructor Challenge!",
    desciption: "Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!",
    getStartedUrl: '#',
  }
  return (
    <div className="flex w-full">
      <div className="md:w-16 h-screen"></div>
        <div className="container mx-auto p-6 py-12 lg:px-12">
          <div className='flex flex-row items-center justify-between'>
            <div className="flex justify-between mt-4 mb-8 relative items-center">
              <h1 className="text-4xl font-bold text-gray-700 ">Courses</h1>
            </div>
          <div className="flex flex-row items-center">
            <a href="/">Student</a>
          <Menu as='div' className='user relative ml-4'>
            <div>
              <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                <img id='preview' src={createImageFromInitials(60, userData.firstName + " " + userData.lastName, getColor())} alt='profile-pic' className='rounded-full w-12 h-12' />
              </Menu.Button>
            </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-99999 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                    {({ active }) => (
                      <a href='/' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Student
                      </a>
                    )}
                  </Menu.Item>
                <hr/>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/home/my-courses/learning'
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        My learning
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='/home/my-courses/wishlist'
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Wishlist
                      </a>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <a href='/user/edit-profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Edit profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href='/user/account-settings' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                  <hr />
                  <div className='flex flex-row justify-between'>
                    <a href='/about-us' className={classNames('px-4 py-2 text-xs text-gray-600')}>
                      About Udemy
                    </a>
                    <a href='/help' className={classNames('px-4 py-2 text-xs text-gray-600')}>
                      Help
                    </a>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
      </div>
      {/* <a href="/instructor/course/123/manage/curriculum">Edit course</a> */}
      {haveCourse && (
        <div>
          <div className="mt-2 flex justify-between">
            <div className="flex gap-10">
              <div className="flex">
                <input className="px-4 border border-black" type="text" placeholder="Search your courses" style={{widows: "186px", height: "48px"}} />
                <button className="w-12 h-12 bg-black flex items-center justify-center"><IoMdSearch className="w-6 h-6 text-white" /></button>
              </div>
          
              {/* <Button color="white" className="rounded-none hover:bg-gray-300 border border-black shadow-none" style={{height: "48px"}}>
                <span className="font-bold text-base normal-case">Newest</span>
              </Button> */}
              <DropdownMenu onSelect={handleFilterSelect} />
            </div>
            <Button color="purple" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => navigate("/instructor/course/create", {replace: true})}>
              <span className="font-bold text-base normal-case">New Course</span>
            </Button>
          </div>
          <div className="my-courses mt-6">
            {courses.map((course, index) => (
              <div className="flex mb-6" key={index}>
                <img src={course.thumbnail} className="object-cover" style={{width: "118px", height: "118px"}} />
                <div className="flex-1 border border-gray-400 p-2 flex relative">
                  <div className="content-block w-1/4 flex flex-col justify-between">
                    <p className="font-bold text-sm">{course.name}</p>
                    <p className="font-bold text-xs">{course.status}</p>
                  </div>
                  <div className="w-3/4 flex items-center">
                    <p className="flex-none text-xs mr-2 font-bold">Finish your course</p>
                    <div class=" flex-1 bg-gray-300 h-2  overflow-hidden">
                      <div class="bg-blue-500 h-full w-1/2 "></div>
                    </div>
                  </div>
                  <button className="edit-cover absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-90 flex items-center justify-center hover:cursor-pointer">
                    <a href="/instructor/course/123/manage/curriculum"><p className="font-bold text-purple-500">Edit / manage course</p></a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!haveCourse && (<CreateCourseCard />)}
      
      <h2 className="mx-auto my-16 text-center">Based on your experience, we think these resources will be helpful.</h2>

      <ResourceCard props={resource1} />
      <div className="flex gap-6 my-8">
        
        <ResourceCard props={resource2} />
        <ResourceCard props={resource3} />

      </div>
      <ResourceCard props={resource4} />
      <h2 className="mx-auto my-16 text-center">Have questions? Here are our most popular instructor resources.</h2>
      </div>
    </div>
  );
};

export default CourseDashBoard;

const DropdownMenu = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Newest");

  const handleSelect = (option) => {
    setSortValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  const optionStyle = "cursor-pointer py-2 px-4 m-0 text-sm hover:text-purple-500 w-full text-left";

  return (
    <div className="relative">
      <Button
        color="white"
        className="rounded-none hover:bg-gray-300 border border-black shadow-none flex px-3"
        style={{ height: '48px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-base normal-case">{sortValue} </span>
        <MdOutlineKeyboardArrowDown className="w-6 h-6" />
      </Button>
      {isOpen && (
        <div className="z-9999 py-2 absolute top-14 left-0 w-48 bg-white border border-gray-300 shadow-md">
            <button onClick={() => handleSelect('Newest')} className={optionStyle}>
              Newest
            </button>
            <button onClick={() => handleSelect('Oldest')} className={optionStyle}>
              Oldest
            </button>
        </div>
      )}
    </div>
  );
};

