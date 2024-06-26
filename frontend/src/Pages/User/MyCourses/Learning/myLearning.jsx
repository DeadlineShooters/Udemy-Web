import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import "./myLearning.css";
import course_overlay from "../../../../Assets/CourseOverlay.png";
import { IconArchive, IconShare } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EditRatingButton from "../../../../Components/Feedback/EditRatingButton";
import { IconDotsVertical } from "@tabler/icons-react";
import { useAuth } from "../../../../AuthContextProvider";
import { useCourse } from "../../../../CourseContextProvider";
import axios from "axios";
import DropdownSimple from "../../../../Components/DropdownSimple";

const MyLearning = () => {
  const { userData } = useAuth();
  const userId = userData._id;
  const [courseList, setCourseList] = useState([]);
  const { setSelectedCourse } = useCourse();
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    if (filter === "favorites") {
      // Filter the courseList to only show favorited courses
      const filteredCourses = courseList.filter((course) => favoriteCourses.includes(course.course._id));
      setCourseList(filteredCourses);
    } else {
      // Fetch all courses if the filter is set to 'all'
      getCourse();
    }
  }, [filter]);

  const handleClickFavorite = async (e, courseId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/addFavorite/${userId}/${courseId}`);
      if (response.data.success) {
        setFavoriteCourses([...favoriteCourses, courseId]);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding course to favorite courses:", error);
    }
  };

  const handleClickUnfavorite = async (e, courseId) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/removeFavorite/${userId}/${courseId}`);

      if (response.data.success) {
        setFavoriteCourses(favoriteCourses.filter((id) => id !== courseId));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing course from favorite courses:", error);
    }
  };

  const fetchFavoriteStatus = async (courseId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user/favorites/${userId}/${courseId}`);
      return response.data.isFavorite; // Assuming the API returns an object with a boolean isFavorite property
    } catch (error) {
      console.error("There has been a problem with your axios operation:", error);
    }
  };

  // Function to update the favorite label and state
  const updateFavoriteLabel = async () => {
    try {
      // Fetch the favorite status for each course and update the state
      const updatedFavoriteCourses = await Promise.all(
        courseList.map(async (course) => {
          const isFavorite = await fetchFavoriteStatus(course.course._id);
          return isFavorite ? course.course._id : null;
        })
      ).then((results) => results.filter((id) => id !== null)); // Filter out null values

      // Update the favoriteCourses state with the new array
      setFavoriteCourses(updatedFavoriteCourses);
    } catch (error) {
      console.error("Error updating favorite labels:", error);
    }
  };

  //ARCHIVED LIST
  useEffect(() => {
    const getArchivedList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user/archived/${userId}`);
      if (response.data.success) {
        setArchivedCourses(response.data.archivedList);
      }
    };
    getArchivedList();
  }, []);

  const handleClickArchived = async (e, courseId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/user/addArchivedList/${userId}/${courseId}`);
      if (response.data.success) {
        setArchivedCourses([...archivedCourses, courseId]);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding course to archived courses:", error);
    }
  };

  const getCourse = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user/${userId}/get-course/all`);
      if (response.data.success) {
        const fetchedCourseList = response.data.courseList;
        const promises = fetchedCourseList.map(async (course) => {
          let feedback = null;
          try {
            const feedbackResponse = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/feedback/${course._id}/${userId}`);
            feedback = feedbackResponse.data.feedback;
          } catch (error) {
            if (error.response.status !== 404) {
              throw error;
            }
          }
          return { ...course, feedback };
        });
        const coursesWithFeedback = await Promise.all(promises);

        // Filter out archived courses
        const nonArchivedCourses = coursesWithFeedback.filter((course) => !archivedCourses.includes(course.course._id));

        // Set the course list state
        setCourseList(nonArchivedCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Call the function to update the favorite status on load
  useEffect(() => {
    updateFavoriteLabel();
  }, [courseList]); // Dependency array ensures this effect runs when courseList changes

  useEffect(() => {
    getCourse();
  }, [archivedCourses]);

  const navigate = useNavigate();
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
            localStorage.setItem("selectLecture", JSON.stringify(saveKey));
            navigate(`/course/${response.data.course.slugName}/learn/${newRecentVideoId}#overview`, { state: { course: response.data.course } });
          } else {
            navigate(`/course/${response.data.course.slugName}/learn/${lectureKey}#overview`, { state: { course: response.data.course } });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="upper-mylearning">
        <h1 className="title text-5xl max-sm:text-4xl font-bold pt-10 pb-10">My learning</h1>
        <div className="filter flex items-center">
          <button className="text-white border-b-8 hover:bg-purple-900 font-bold py-2 rounded text-lg max-sm:text-base">
            <Link
              to="/home/my-courses/learning"
              onClick={() => {
                setFilter("all");
              }}
            >
              All courses
            </Link>
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
        {courseList.length > 0 ? (
          <div>
            <form class="functionbar flex flex-row items-end justify-end w-full ml-auto pb-8 px-2">
              <div className="filter flex flex-row items-center px-5">
                <span className="mr-2">Filter by:</span>
                <DropdownSimple label={"Categories"} onChange={handleFilterChange} />
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
              </div>
            </form>
            <div className="flex flex-wrap justify-center md:justify-start">
              {courseList.map((oneCourse, index) => (
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
                                  <IconShare className="h-5 w-5 mr-3" />
                                  <a href="/user/public-profile">Share link</a>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div className={classNames(active ? "bg-gray-100" : "", "flex flex-row items-center px-4 py-2 text-sm text-gray-700")}>
                                  <IconArchive className="h-5 w-5 mr-3" color="#000000" />
                                  <a
                                    href="/home/my-courses/learning"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleClickArchived(e, oneCourse.course._id);
                                    }}
                                  >
                                    Archive
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div className={classNames(active ? "bg-gray-100" : "", "flex flex-row items-center px-4 py-2 text-sm text-gray-700")}>
                                  <FontAwesomeIcon icon={faStar} className="text-black text-lg mr-3" />
                                  <a
                                    href="/home/my-courses/learning"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (favoriteCourses.includes(oneCourse.course._id)) {
                                        handleClickUnfavorite(e, oneCourse.course._id);
                                      } else {
                                        handleClickFavorite(e, oneCourse.course._id);
                                      }
                                    }}
                                  >
                                    {favoriteCourses.includes(oneCourse.course._id) ? "Unfavorite" : "Favorite"}
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
                        <p className="text-slate-500  text-sm">{oneCourse.progress.toPrecision(3)}% Complete</p>
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
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center my-20">
            <h2 className="text-xl font-bold">Explore a plethora of courses and expand your knowledge.</h2>
            <h2 className="flex flex-row text-xl">
              <p className="text-[#5037b5] font-bold mr-2 underline hover:cursor-pointer" onClick={() => navigate("/")}>
                Visit Discover
              </p>
              to uncover new learning opportunities.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
