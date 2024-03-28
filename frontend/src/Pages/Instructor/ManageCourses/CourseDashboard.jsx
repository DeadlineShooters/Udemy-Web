import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import CreateCourseCard from "../../../Components/CourseDashboard/CreateCourseCard";


const CourseDashBoard = () => {
  const haveCourse = false;


  return (
    <DashboardHeaderTitle title={"Courses"}>
      {/* <a href="/instructor/course/123/manage/curriculum">Edit course</a> */}
      {haveCourse && (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">My Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CourseCard
              title="Course 1"
              instructor="John Doe"
              imageUrl="https://via.placeholder.com/300"
              rating={4.5}
            />
            <CourseCard
              title="Course 2"
              instructor="Jane Smith"
              imageUrl="https://via.placeholder.com/300"
              rating={4.8}
            />
          </div>
        </div>

        </div>
      )}
      
      <CreateCourseCard/>

    </DashboardHeaderTitle>
  );
};

export default CourseDashBoard;

function CourseCard({ title, instructor, imageUrl, rating }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4 rounded-md" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600 mb-2">{instructor}</p>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-yellow-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 1l2.39 6.49h6.18l-4.99 3.93L15.5 19 10 15.31 4.51 19l1.4-6.58L3.43 7.49h6.18L10 1zm0 2.13L8.72 7.49H3.72l4.06 3.2-1.54 7.26L10 14.69l4.76 3.26-1.54-7.26 4.06-3.2h-5l-1.29-4.36z" clipRule="evenodd" />
        </svg>
        <span className="text-gray-600">{rating}</span>
      </div>
    </div>
  );
}
