import { RouterProvider, Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import { useState } from "react";
//Component
import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/sidebar.jsx";
import Footer from "./Components/Footer/Footer.jsx";

//General page
import Home from "./Pages/Discover/Home/Home.jsx";
import CourseContent from "./Pages/Course/Content/Content.jsx";
import NotFound from "./Components/404/404.jsx";
import PageError from "./Pages/User/Authentication/PageError.jsx";
import Verification from "./Pages/User/Authentication/Verification.jsx";
import SuccessVerify from "./Pages/User/Authentication/SuccessVerify.jsx";
import CourseDetail from "./Pages/User/CourseLandingPage/CourseDetail.jsx";
import Cart from "./Pages/Cart/cart.jsx";
import CoursesByCategory from "./Pages/Discover/CoursesByCategory/coursesByCategory.jsx";
import ProtectedRoutes from "./Components/Utils/AuthSecure.jsx";
import Search from "./Pages/Discover/Search/search.jsx";

//Student page
import MyLearning from "./Pages/User/MyCourses/Learning/myLearning.jsx";
import Wishlist from "./Pages/User/MyCourses/Wishlist/Wishlist.jsx";
import Archived from "./Pages/User/MyCourses/Archived/Archived.jsx";

//User edit & settings page
import PublicProfile from "./Pages/User/ManageAccount/publicProfile.jsx";
import EditProfile from "./Pages/User/ManageAccount/editProfile.jsx";
import AccountSettings from "./Pages/User/ManageAccount/accountSettings.jsx";
import CloseAccount from "./Pages/User/ManageAccount/closeAccount.jsx";
import Register from "./Pages/User/Authentication/Register.jsx";
import Login from "./Pages/User/Authentication/Login.jsx";
import HandlePopUpLogin from "./Pages/User/Authentication/HandlePopUpLogin.jsx";

//Instructor page
import CourseDashBoard from "./Pages/Instructor/ManageCourses/CourseDashboard.jsx";
import InstructorRegister from "./Pages/Instructor/InstructorProfile/InstructorBecome.jsx";

import Statistics from "./Pages/Instructor/Statistics/Statistics.jsx";
import CourseLandingPage from "./Pages/Instructor/ManageCourses/CourseLandingPage.jsx";
import Reviews from "./Pages/Instructor/Reviews.jsx";
import ManageCourseLayout from "./Components/CourseManagement/ManageCourseLayout.jsx";
import Curriculum from "./Pages/Instructor/ManageCourses/Curriculum.jsx";
import QuestionAndAnswer from "./Pages/Instructor/QA/QA.jsx";
import CreateCourse from "./Pages/Instructor/ManageCourses/CreateCourse.jsx";
import InstructorProfile from "./Pages/Instructor/InstructorProfile/InstructorProfile.jsx";
// import { useInView } from "react-intersection-observer";
import ScrollContext from "./context/ScrollContext.js";

// import fonts
import "./fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf";
import { useAuth } from "./AuthContextProvider.jsx";
import Certificate from "./Pages/Course/Certificate/Certificate.jsx";
import HeaderInstructorDashboard from "./Components/HeaderInstructorDashboard.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const CourseDashboardLayout = () => {
  return (
    <div>
      <HeaderInstructorDashboard />
      <div>
        <Sidebar />
        <Outlet />
      </div>

      {/* <Footer/>*/}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/handle-message",
        element: <HandlePopUpLogin />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user/verify",
        element: <Verification />,
      },
      {
        path: "/user/verified/success",
        element: <SuccessVerify />,
      },
      {
        path: "/user/verified/error/:message",
        element: <PageError />,
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "my-courses/learning",
            element: <MyLearning />,
          },
          {
            path: "my-courses/wishlist",
            element: <Wishlist />,
          },
          {
            path: "my-courses/archived",
            element: <Archived />,
          },
        ],
      },
    ],
  },
  {
    path: "/courses",
    element: <Layout />,
    children: [
      {
        path: ":categoryId",
        element: <CoursesByCategory />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "public-profile",
            element: <PublicProfile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "account-settings",
            element: <AccountSettings />,
          },
          {
            path: "instructor-become",
            element: <InstructorRegister />,
          },
          {
            path: "instructor-profile/:userId",
            element: <InstructorProfile />,
          },
          {
            path: "close-account",
            element: <CloseAccount />,
          },
        ],
      },
    ],
  },
  {
    path: "/course/:courseId",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <CourseDetail />,
      },
    ],
  },
  {
    path: "/course/:slug",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "certificate",
        element: <Layout />,
        children: [
          {
            path: ":cerId",
            element: <Certificate />,
          },
        ],
      },
    ],
  },
  {
    path: "/course/:slug/learn/:lectureIndex",
    element: <CourseContent />,
  },
  {
    path: "/instructor",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <CourseDashboardLayout />,
        children: [
          {
            path: "courses",
            element: <CourseDashBoard />,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
          {
            path: "qa",
            element: <QuestionAndAnswer />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
        ],
      },
    ],
  },
  {
    path: "/instructor/course/:courseSlug/manage",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <ManageCourseLayout />,
        children: [
          {
            path: "curriculum",
            element: <Curriculum />,
          },
          {
            path: "basics",
            element: <CourseLandingPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/instructor/course/create",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <CreateCourse />,
      },
    ],
  },
]);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
