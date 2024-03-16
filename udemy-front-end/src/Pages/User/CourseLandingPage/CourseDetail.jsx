import React from "react";
import { useState } from "react";
import "./CourseDetail.css"; // Importing a CSS file to style the component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faExclamation, faCirclePlay, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import Section from "../../../Components/CourseLandingPage/Section";
import ProfileCard from "../../../Components/CourseLandingPage/ProfileCard";
import CourseReview from "../../../Components/CourseLandingPage/CourseReview";
import HeartIcon from "../../../Components/CourseLandingPage/HeartIcon";

const CourseDetail = () => {
  const courseSections = [
    {
      title: "Introduction",
      lectures: [
        { title: "Why This Course?", duration: "02:50", isPreview: true },
        { title: "Course Roadmap", duration: "03:07" },
      ],
    },
    {
      title: "Course Setup and Introduction to Software Testing",
      lectures: [
        { title: "Section Introduction", duration: "00:26" },
        { title: "Working with Subtitles", duration: "01:11" },
        { title: "Software Testing Overview", duration: "07:39" },
      ],
    },
    {
      title: "Deep Dive In Testing",
      lectures: [
        { title: "Understanding Unit Tests", duration: "05:12" },
        { title: "Integration Testing Explained", duration: "04:45" },
        { title: "The Importance of Mocking", duration: "03:30" },
      ],
    },
  ];

  const reviews = [
    { id: 1, firstName: "Alice", lastName: "B", rating: 5, comment: "Great course! Very informative and well-structured." },
    { id: 2, firstName: "Bob", lastName: "B", rating: 4, comment: "I learned a lot, especially appreciated the hands-on exercises." },
    { id: 3, firstName: "Charlie", lastName: "B", rating: 5, comment: "Instructors were knowledgeable and helpful." },
    { id: 4, firstName: "Zara", lastName: "B", rating: 5, comment: "Excellent content, I would highly recommend this course to others." },
    { id: 5, firstName: "Mia", lastName: "B", rating: 4, comment: "The course was well-organized and easy to follow." },
    { id: 6, firstName: "Noah", lastName: "B", rating: 5, comment: "Fantastic course! I gained a lot of valuable knowledge." },
    { id: 7, firstName: "Oliver", lastName: "B", rating: 4, comment: "Good course overall, though I wish there were more practice exercises." },
    { id: 8, firstName: "Sophia", lastName: "B", rating: 5, comment: "The course exceeded my expectations. I learned a lot in a short amount of time." },
    { id: 9, firstName: "Ava", lastName: "B", rating: 4, comment: "The course content was relevant and up-to-date." },
    { id: 10, firstName: "Ethan", lastName: "B", rating: 5, comment: "The instructors were very responsive and helpful." },
    { id: 11, firstName: "Isabella", lastName: "A", rating: 4, comment: "I enjoyed the course and would recommend it to others." },
    { id: 12, firstName: "Lucas", lastName: "An", rating: 5, comment: "The course was challenging but rewarding. I learned a lot." },
  ];

  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };
  const heartIcon = isFocused ? solidHeart : regularHeart;

  return (
    <div className="w-full h-full course-title-container">
      <div
        className="course-detail-container w-full lg:bg-course-title-bg-grey
       lg:px-20 py-5 md:px-10 sm:px-5 sm:text-black lg:text-white sm:flex sm:flex-col sm:items-center lg:block "
      >
        <div id="short-description" className=" lg:w-1/2 relative left-0">
          <h1 className="course-title font-bold text-3xl">Software Testing Masterclass (2024) - From Novice to Expert</h1>
          <br />
          <p className="course-description">
            Learn software testing and become QA Engineer/Agile Tester. Mobile/Backend/Web/QA testing. JIRA, TestRail & much more!
          </p>
          <br />

          <div className="course-rating flex items-center">
            <div className="text-amber-500 font-bold mr-1 text-sm">
              <span>4.5 </span>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <a href="/" className="mr-3 text-violet-500 underline text-sm ">
              (9,662 ratings)
            </a>
            <span className="text-sm">40,653 students</span>
          </div>
          <p>
            <FontAwesomeIcon icon={faExclamation} className="text-red-500 text-sm mr-2" />
            <span className="text-sm">Created date Apr 9, 2022</span>
          </p>
        </div>
        <div className="sidebar-container  sm:w-8/12 lg:w-3/12 shadow-lg sm:-translate-y-0 lg:-translate-y-1/2 bg-white lg:fixed lg:right-6">
          <button type="button" className="relative w-full h-full ">
            <div
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url('https://cdn.discordapp.com/attachments/973498508793503745/1217696152044961852/2151486_095a_6.jpg?ex=6604f6ea&is=65f281ea&hm=2c883878c56eeeccff8c64f989924f67a38678a3e4254290d7c09392b68b6d86&')`,
                backgroundSize: "cover",
                width: "100%", // take full width of the parent
                paddingBottom: "55%", // maintain aspect ratio (height is 75% of width)
                backgroundPosition: "center", // center the background image
              }}
            ></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={faCirclePlay} />
            </span>
            <span className="absolute bottom-1 left-0 right-0 text-center font-bold text-white">Preview this course</span>
          </button>
          <div className="body-sidebar px-6 py-4">
            <div className="price mb-2 break-words">
              <span className="money-unit font-bold lg:text-3xl sm:text-lg md:text-xl text-slate-950">đ</span>
              <span className="price-number font-bold lg:text-3xl sm:text-lg md:text-xl text-slate-950 ">349,000</span>
            </div>
            <div className="flex flex-row mb-2 buttons w-full justify-between ">
              <button className="flex-5 w-full mr-2 py-2 h-12 text-sm xl:text-lg bg-purple-500 text-white rounded font-bold">Add to Cart</button>
              <HeartIcon wishlistState={true} />
            </div>
            <button className="w-full border border-black h-12 font-bold text-black">Buy now</button>
          </div>
        </div>
      </div>

      <div className="course-details-outermost-container lg:py-5 lg:px-20 flex items-center px-6">
        <div className="course-info-container lg:w-7/12 sm:10/12 md:px-10 sm:px-1">
          <span className="price-number font-bold text-2xl text-slate-950 ">Course content</span>
          <div className="content-description mt-5">
            <span className="price-number text-sm text-slate-950 ">13</span>
            <span className="price-number  text-sm  text-slate-950 "> sections • </span>
            <span className="price-number  text-sm  text-slate-950 ">94</span>
            <span className="price-number  text-sm  text-slate-950 "> lectures • </span>
            <span className="price-number  text-sm  text-slate-950 ">8h41m</span>
            <span className="price-number  text-sm  text-slate-950 "> total length</span>
          </div>

          <div className="curriculum-container course-layout mb-5 ">
            {courseSections.map((section, index) => (
              <Section key={index} {...section} isLastSection={index === courseSections.length - 1} />
            ))}
          </div>
          <span className="price-number font-bold text-2xl text-slate-950">Description</span>
          <div className="text-sm mt-5 mb-5">
            <h1>Welcome to the Complete Software Testing Masterclass.</h1>
            <br />
            <p>
              Learn software testing with this course and become a successful software tester/agile Tester. Obtain the core Mobile Testing, Backend testing, Web
              testing, and Test Engineering skills, and learn JIRA, SQL, TestRail, TestGear, Confluence, Charles Proxy, and GitHub. By the end of this course,
              you will have enough knowledge to get a job as a software tester or start working as a freelancer! We will also explain many testing platforms
              where you can start earning money as a beta tester.
            </p>

            <br />

            <p>We'll take you step-by-step through engaging video tutorials and teach you everything you need to know to succeed as a Software Tester.</p>

            <br />

            <p>
              The course includes over hours and hours of 1080P (HD) video tutorials with high-quality sound. All the videos are hand-edited and unnecessary
              parts are removed. You will only learn "what you need to learn" to become successful!
            </p>
          </div>
          <span className="price-number font-bold text-2xl text-slate-950 ">Instructor</span>
          <ProfileCard
            headline={"Senior Software Test Engineer and Educator"}
            instructor_fullname={"Ozan Ilhan"}
            noStudents={"79,880"}
            noReviews={"21,207"}
            profileImg={
              "https://cdn.discordapp.com/attachments/973498508793503745/1218098368040013834/23365736_7d3b_2.png?ex=66066d82&is=65f3f882&hm=90ef9be9b62dec627753dd175ee5ae8d608b1e7e4e5ed62b0689f1b75f9bc4f7&"
            }
          />
          <div className="border-b pb-2">
            <span className="price-number font-bold text-2xl text-slate-950">Student feedback</span>
          </div>
          <div className="star-filter flex h-1/5 items-center my-3 ">
            <div className="average-container h-full flex flex-col justify-between mr-5 ">
              <span className="text-gray-500 font-bold text-lg w-1/4" id="average-text">
                Average
              </span>

              <div className="average flex flex-row justify-between items-center">
                <span className="price-number font-bold text-3xl text-slate-950">4.5</span>
                <FontAwesomeIcon icon={faStar} className="text-amber-500" />
              </div>
            </div>
            <div class="rating-button-container flex flex-col h-full">
              <div className="rating-row flex flex-row">
                <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">All</button>
                <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">5 Stars - 15%</button>
                <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">4 Stars - 25%</button>
              </div>
              <div className="rating-row flex flex-row">
                <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">3 Stars - 30%</button>

                <button class="rating-button focus:text-purple-600 focus:border-purple-600 text-sm">1 Star - 10%</button>
              </div>
            </div>
          </div>
          <div id="reviews-container">
            {reviews.map((review, index) => (
              <CourseReview key={index} review={review} />
            ))}
            <button className="w-full border border-black py-2 font-bold text-black text-sm">Show more reviews</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
