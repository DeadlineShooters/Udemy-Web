import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./CourseDetail.css"; // Importing a CSS file to style the component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faExclamation, faCirclePlay, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import Section from "../../../Components/CourseLandingPage/Section";
import ProfileCard from "../../../Components/CourseLandingPage/ProfileCard";
import CourseReview from "../../../Components/CourseLandingPage/CourseReview";
import HeartIcon from "../../../Components/CourseLandingPage/HeartIcon";
import NotFound from "../../../Components/404/404";
import Modal from "../../../Components/Feedback/Modal";
import Spinner from "../../../Components/Spinner.jsx";
import PreviewModal from "./PreviewModal";
import { createImageFromInitials } from "../../../Components/Utils/Utils.js";
import { convertDecimal128ToNumber } from "../../../Components/Utils/Utils.js";
import { useFeedbacks } from "../../../Components/Feedback/useFeedbacks.js";
import Pagination from "../../../Components/Pagination.jsx";
import DOMPurify from "dompurify";
import ScrollContext from "../../../context/ScrollContext.js";

const CourseDetail = () => {
  const videoRef = useRef();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { feedbacks, isLoading, count } = useFeedbacks(courseId);
  const { isFooterInView } = useContext(ScrollContext);

  console.log("in view: " + isFooterInView);
  console.log("isloading: " + isLoading);

  console.log(process.env.REACT_APP_BACKEND_HOST);

  const handlePlayVideo = () => {
    document.body.style.overflow = "hidden";
    if (videoRef.current) {
      videoRef.current.src = course.promotionalVideo.secureURL;
      videoRef.current.play();
    }
  };

  function formatSecondsToHoursMinutesSeconds(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return hours + "h" + minutes + "m" + seconds + "s";
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Course not found");
        } else {
          console.error("Error:", error);
        }
      });
  }, [courseId]);

  if (!course) {
    return <Spinner />;
  }

  // if (isLoading) return <Spisnner />;

  if (error) {
    return <NotFound />;
  }

  // Convert the createDate string to a Date object
  const date = new Date(course.createDate);

  const sanitizedHTML = DOMPurify.sanitize(course.description);

  // Format the date
  const formattedDate = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className={`w-full h-full course-title-container`}>
      {/* <video ref={videoRef} src={course.promotionalVideo.secureURL} style={{ display: "none" }} /> */}
      <div
        className="course-detail-container w-full lg:bg-course-title-bg-grey
        lg:py-5 lg:px-20 sm:mt-5 sm:mb-5 sm:px-5 sm:text-black lg:text-white sm:flex sm:flex-col sm:items-center lg:block "
      >
        <div id="short-description" className=" relative lg:px-10 w-full px-6 sm:mb-5 lg:w-1/2">
          <h1 className="course-title font-bold text-3xl">{course.name}</h1>
          <br />
          <p className="course-description text-xl">{course.introduction}</p>
          <br />

          <div className="course-rating flex items-center">
            <div className="text-amber-500 font-bold mr-1 text-lg">
              <span className="mr-1">{convertDecimal128ToNumber(course.avgRating)}</span>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <a href="#reviews" className="mr-3 text-violet-500 underline  text-purple-200 text-lg">
              ({course.oneStarCnt + course.twoStarCnt + course.threeStarCnt + course.fiveStarCnt + course.fourStarCnt} ratings)
            </a>
            <span className="text-lg">{course.totalStudent} students</span>
          </div>
          <p>
            <FontAwesomeIcon icon={faExclamation} className="text-red-500 mr-2 text-lg" />
            <span className="text-lg">Created date {formattedDate}</span>
          </p>
        </div>
        <div className={`sidebar-container  sm:w-8/12 lg:w-3/12 lg:shadow-lg sm:shadow-md sm:-translate-y-0 lg:-translate-y-1/3 bg-white ${isFooterInView ? "" : "lg:fixed"}  lg:right-6  `}>
          <Modal>
            <Modal.Open opens="view-course-preview">
              <button type="button" className="relative w-full h-full" onClick={handlePlayVideo}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url('${course.thumbNail.secureURL}')`,
                    backgroundSize: "cover",
                    width: "100%", // take full width of the parent
                    paddingBottom: "55%", // maintain aspect ratio (height is 75% of width)
                    backgroundPosition: "center", // center the background image
                  }}
                ></div>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon={faCirclePlay} size="2x" color="white" />
                </span>
                <span className="absolute bottom-1 left-0 right-0 text-center font-bold text-white">Preview this course</span>
              </button>
            </Modal.Open>
            <Modal.Window name="view-course-preview">
              <PreviewModal videoRef={videoRef} course={course} />
            </Modal.Window>
          </Modal>

          <div className="body-sidebar px-6 py-4">
            <div className="price mb-2 break-words text-black">
              <span className="money-unit font-bold lg:text-3xl sm:text-lg md:text-xl text-slate-900">đ</span>
              <span className="price-number font-bold lg:text-3xl sm:text-lg md:text-xl text-slate-900">{course.price.toLocaleString()}</span>
            </div>
            <div className="flex flex-row mb-2 buttons w-full justify-between ">
              <button className={`flex-5 w-full mr-2 py-2 h-12 text-sm xl:text-lg bg-purple-500 text-white rounded font-bold `}>Add to Cart</button>
              <HeartIcon wishlistState={true} />
            </div>
            <button className="w-full border border-black h-12 font-bold text-black">Buy now</button>
          </div>
        </div>
      </div>

      <div className="course-details-outermost-container lg:py-5 lg:px-20 flex items-center px-6">
        <div className="course-info-container lg:w-8/12 sm:10/12 md:px-10 ">
          <span className="price-number font-bold text-2xl text-slate-950 ">Course content</span>
          <div className="content-description mt-5">
            <span className="text-lg price-number text-slate-950 ">{course.totalSection}</span>
            <span className="text-lg price-number text-slate-950 "> sections • </span>
            <span className="text-lg price-number text-slate-950 ">{course.totalLecture}</span>
            <span className="text-lg price-number text-slate-950 "> lectures • </span>
            <span className="text-lg price-number text-slate-950 ">{formatSecondsToHoursMinutesSeconds(course.totalLength)}</span>
            <span className="text-lg price-number text-slate-950 "> total length</span>
          </div>

          <div className="curriculum-container course-layout mb-5 ">
            {course.sectionList.map((section) => (
              <Section key={section._id} title={section.name} lectures={section.lectures} isLastSection={section.index === course.sectionList.length - 1} />
            ))}
          </div>
          <span className="price-number font-bold text-2xl text-slate-950">Description</span>
          <div className="text-lg mt-5 mb-5" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
          <span className="price-number font-bold text-2xl text-slate-950 ">Instructor</span>
          <ProfileCard
            instructor={course.instructor}
            profileImg={course.instructor.avatar ? course.instructor.avatar.public_id : createImageFromInitials(160, course.instructor.firstName + " " + course.instructor.lastName)}
          />

          {count > 0 && (
            <div id="reviews">
              <div className="border-b pb-2">
                <span className="price-number font-bold text-2xl text-slate-950">Student feedback</span>
              </div>
              <div className="star-filter flex h-1/5 items-center my-3 ">
                <div className="average-container h-full flex flex-col justify-between mr-5 ">
                  <span className="text-gray-500 font-bold text-lg w-1/4" id="average-text">
                    Average
                  </span>

                  <div className="average flex flex-row justify-between items-center">
                    <span className="price-number font-bold text-3xl text-slate-950">{convertDecimal128ToNumber(course.avgRating)}</span>
                    <FontAwesomeIcon icon={faStar} className="text-amber-500" size="lg" />
                  </div>
                </div>
                <div class="rating-button-container flex flex-col h-full">
                  <div className="rating-row flex flex-row">
                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">All</button>
                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">5 Stars - {course.fiveStarCnt}</button>
                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">4 Stars - {course.fourStarCnt}</button>
                  </div>
                  <div className="rating-row flex flex-row">
                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">3 Stars - {course.threeStarCnt}</button>

                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">2 Stars -{course.twoStarCnt}</button>

                    <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">1 Star - {course.oneStarCnt}</button>
                  </div>
                </div>
              </div>
              <div id="reviews-container">
                {feedbacks.map((review, index) => (
                  <CourseReview key={index} review={review} />
                ))}
                <Pagination count={count} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
