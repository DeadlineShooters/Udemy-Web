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
import {StarRatings} from "../../../Components/StarRatings.jsx";
import axios from "axios";
import "./CourseDashboard.css";

const profileImage = "https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const CourseDashBoard = () => {
  const { userData } = useAuth();
  const instructorID = userData._id;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isHaveCourse, setHaveCourse] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedCourse } = useCourse();

  const handleCourseSelectionAndNav = (course) => {
    navigate(`/instructor/course/${course.slugName}/manage/basics`);
    setSelectedCourse(course);
  };

  useEffect(() => {
    const getCourse = () => {
      axios
        .post("http://localhost:5000/instructor/get-course", { instructorID })
        .then((response) => {
          if (response.data.success) {
            setCourses(response.data.course);
          } else {
            setHaveCourse(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        }).finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    };
    getCourse();
  }, []);
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // Perform filtering logic based on selected filter
    // alert(filter)
  };
  const resource1 = {
    publicId: "Udemy-important/dashboard_img1",
    title: "Create an Engaging Course",
    desciption:
      "Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.",
    getStartedUrl: "#",
  };
  const resource2 = {
    publicId: "Udemy-important/dashboard_img2",
    title: "Get Started with Video",
    desciption: "Quality video lectures can set your course apart. Use our resources to learn the basics.",
    getStartedUrl: "#",
  };
  const resource3 = {
    publicId: "Udemy-important/dashboard_img3",
    title: "Build Your Audience",
    desciption: "Set your course up for success by building your audience.",
    getStartedUrl: "#",
  };
  const resource4 = {
    publicId: "Udemy-important/dashboard_img4",
    title: "Join the New Instructor Challenge!",
    desciption:
      "Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!",
    getStartedUrl: "#",
  };
  return (
    <div className="flex w-full">
      <div className="md:w-16 h-screen"></div>
      <div className="container mx-auto p-6 py-12 lg:px-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-between mt-4 mb-8 relative items-center">
            <h1 className="text-4xl font-bold text-gray-700 ">Courses</h1>
          </div>
          <div className="flex flex-row items-center">
            <a href="/">Student</a>
            <UserNav />
          </div>
        </div>
        {/* <a href="/instructor/course/123/manage/curriculum">Edit course</a> */}
        {isHaveCourse === true && (
          <div>
            <div className="mt-2 flex justify-between">
              <div className="flex gap-10">
                <div className="flex">
                  <input className="px-4 border border-black" type="text" placeholder="Search your courses" style={{ widows: "186px", height: "48px" }} />
                  <button className="w-12 h-12 bg-black flex items-center justify-center">
                    <IoMdSearch className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* <Button color="white" className="rounded-none hover:bg-gray-300 border border-black shadow-none" style={{height: "48px"}}>
                <span className="font-bold text-base normal-case">Newest</span>
              </Button> */}
                <DropdownMenu onSelect={handleFilterSelect} />
              </div>
              <Button color="purple" className="rounded-none hover:bg-violet-800" style={{ height: "48px" }} onClick={() => navigate("/instructor/course/create", { replace: true })}>
                <span className="font-bold text-base normal-case">New Course</span>
              </Button>
            </div>
            {!loading ?
            <div className="my-courses mt-6">
              {courses.map((course, index) => (
                <div className="flex mb-6" key={index}>
                  <img src={course.thumbNail.secureURL} className="object-cover" style={{ width: "209px", height: "118px" }} />
                  <div className="flex-1 border border-gray-400 p-2 flex relative">
                    <div className="content-block w-1/4 flex flex-col justify-between">
                      <p className="font-bold text-sm line-clamp-2">{course.name}</p>
                      {course.status === true ? <p className="p-2 w-10 bg-black text-white font-bold text-xs">Live</p> : <p className="font-bold text-xs">Draft</p>}
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
                            <p className="text-xl font-bold">${course.totalRevenue.toString().padStart(2, "0")}</p>
                            <p className="line-clamp-1">Total Revenue</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                              <p className="text-xl font-bold mr-2">{course.avgRating || 0}</p>
                              <StarRatings rating={course.avgRating || 0} />
                            </div>
                            <p className="line-clamp-1">Course rating</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-3/4 flex items-center">
                        <p className="flex-none text-xs mr-2 font-bold">Finish your course</p>
                        <div class=" flex-1 bg-gray-300 h-2  overflow-hidden">
                          <div class="bg-blue-500 h-full w-1/2 "></div>
                        </div>
                      </div>
                    )}
                    <button
                      className="edit-cover absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-90 flex items-center justify-center hover:cursor-pointer"
                      onClick={() => handleCourseSelectionAndNav(course)}
                    >
                      <p className="font-bold text-purple-500">Edit / manage course</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          : (
            <div class="text-center">
              <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
          </div>
        )}
        {!loading && isHaveCourse === false && <CreateCourseCard/>}
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
      <Button color="white" className="rounded-none hover:bg-gray-300 border border-black shadow-none flex px-3" style={{ height: "48px" }} onClick={() => setIsOpen(!isOpen)}>
        <span className="font-bold text-base normal-case">{sortValue} </span>
        <MdOutlineKeyboardArrowDown className="w-6 h-6" />
      </Button>
      {isOpen && (
        <div className="z-9999 py-2 absolute top-14 left-0 w-48 bg-white border border-gray-300 shadow-md">
          <button onClick={() => handleSelect("Newest")} className={optionStyle}>
            Newest
          </button>
          <button onClick={() => handleSelect("Oldest")} className={optionStyle}>
            Oldest
          </button>
        </div>
      )}
    </div>
  );
};
