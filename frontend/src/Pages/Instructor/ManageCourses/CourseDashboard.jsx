import React from "react";
import { useState, useEffect } from "react";
import CreateCourseCard from "../../../Components/CourseDashboard/CreateCourseCard";
import ResourceCard from "../../../Components/CourseDashboard/ResourceCard";
import { Button } from "@material-tailwind/react";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import UserNav from "../../../Components/UserNav.jsx";
import { useAuth } from "../../../AuthContextProvider.jsx";
import { useCourse } from "../../../CourseContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import StarRatings from "../../../Components/StarRatings.jsx";
import axios from "axios";
import './CourseDashboard.css';

const profileImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const CourseDashBoard = () => {
  const { userData } = useAuth();
  const instructorID = userData._id; 
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isHaveCourse, setHaveCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { setSelectedCourse } = useCourse();

  const handleCourseSelectionAndNav = (course) => {
    navigate(`/instructor/course/${course.slugName}/manage/basics`)
    setSelectedCourse(course);
  };

  const img_illust1 = "https://res.cloudinary.com/dqxtf297o/image/upload/v1714285439/Udemy-important/dashboard_img1.jpg";
  const img_illust2 = "https://res.cloudinary.com/dqxtf297o/image/upload/v1714285845/Udemy-important/dashboard_img4.jpg";
  const img_illust3 = "https://res.cloudinary.com/dqxtf297o/image/upload/v1714286036/Udemy-important/dashboard_img3.jpg";
  const img_illust4 = "https://res.cloudinary.com/dqxtf297o/image/upload/v1714286036/Udemy-important/dashboard_img2.jpg";

  useEffect(() => {
    const getCourse = () => {
      axios.post('http://localhost:5000/instructor/get-course', {instructorID})
			.then((response) => {
				if (response.data.success) {
          setHaveCourse(true);
          console.log("Course got:", response.data.course);
          setCourses(response.data.course);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
    }
    getCourse();
  }, [courses])
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // Perform filtering logic based on selected filter
    // alert(filter)
  };
  const resource1 = {
    imgSrc: img_illust3,
    title: "Create an Engaging Course",
    desciption: "Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.",
    getStartedUrl: '#',
  }
  const resource2 = {
    imgSrc: img_illust1,
    title: "Get Started with Video",
    desciption: "Quality video lectures can set your course apart. Use our resources to learn the basics.",
    getStartedUrl: '#',
  }
  const resource3 = {
    imgSrc: img_illust2,
    title: "Build Your Audience",
    desciption: "Set your course up for success by building your audience.",
    getStartedUrl: '#',
  }
  const resource4 = {
    imgSrc: img_illust4,
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
            <UserNav/>
          </div>
      </div>
      {/* <a href="/instructor/course/123/manage/curriculum">Edit course</a> */}
      {isHaveCourse && (
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
                <img src={course.thumbNail.secureURL} className="object-cover" style={{width: "209px", height: "118px"}} />
                <div className="flex-1 border border-gray-400 p-2 flex relative">
                  <div className="content-block w-1/4 flex flex-col justify-between">
                    <p className="font-bold text-sm line-clamp-2">{course.name}</p>
                    {course.status === true ? (<p className="p-2 w-10 bg-black text-white font-bold text-xs">Live</p>): (<p className="font-bold text-xs">Draft</p>)}
                  </div>
                  {course.status === true ? (
                    <div className="courseDetails flex flex-row w-full justify-between px-28">
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold">{course.totalStudent}</p>
                          <p className="line-clamp-1">Enrollments this month</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold">${course.totalRevenue.toString().padStart(2, '0')}</p>
                          <p className="line-clamp-1">Total Revenue</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center">
                            <p className="text-xl font-bold mr-2">{course.avgRating || 0}</p>
                            <StarRatings rating={course.avgRating || 0}/>
                          </div>
                          <p className="line-clamp-1">Course rating</p>
                        </div>
                      </div>
                    </div>
                  ) : 
                  (<div className="w-3/4 flex items-center">
                    <p className="flex-none text-xs mr-2 font-bold">Finish your course</p>
                      <div class=" flex-1 bg-gray-300 h-2  overflow-hidden">
                        <div class="bg-blue-500 h-full w-1/2 "></div>
                      </div>
                  </div>)}
                  <button className="edit-cover absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-90 flex items-center justify-center hover:cursor-pointer" onClick={() => handleCourseSelectionAndNav(course)}>
                    <p className="font-bold text-purple-500">Edit / manage course</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isHaveCourse && (<CreateCourseCard />)}
      
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