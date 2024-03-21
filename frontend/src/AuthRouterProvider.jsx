import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.jsx';
import CourseNavbar from "./Components/CourseNavBar/CourseNavBar.jsx"
import Home from './Pages/Home/Home.jsx';
import MyLearning from "./Pages/User/MyCourses/Learning/myLearning.jsx";
import Wishlist from "./Pages/User/MyCourses/Wishlist/Wishlist.jsx";
import Archived from './Pages/User/MyCourses/Archived/Archived.jsx';
import PublicProfile from "./Pages/User/ManageAccount/publicProfile.jsx";
import EditProfile from "./Pages/User/ManageAccount/editProfile.jsx";
import AccountSettings from "./Pages/User/ManageAccount/accountSettings.jsx";
import CloseAccount from './Pages/User/ManageAccount/closeAccount.jsx';
import Register from "./Pages/User/Authentication/Register.jsx";
import Login from "./Pages/User/Authentication/Login.jsx";
import HandlePopUpLogin from "./Pages/User/Authentication/HandlePopUpLogin.jsx";
import CourseContent from './Pages/Course/Content/Content.jsx';
import NotFound from './Components/404/404.jsx';
import CourseDetail from "./Pages/User/CourseLandingPage/CourseDetail.jsx";

// import fonts
import "./fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf";

const Layout = () => {
  return(
      <>
        <Navbar/>
        <Outlet/>
        {/* <Footer/>*/}
      </>
  )
}

const CourseLayout = () => {
    return(
        <>
          <CourseNavbar/>
          <Outlet/>
          {/* <Footer/>*/}
        </>
    )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {  
      path: "/",
        element: <Home/>
      },
      {
        path: "*",
        element: <NotFound/>
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/login/handle-message",
        element: <HandlePopUpLogin/>
      }
    ]
  },
  {
    path: "/home",
    element: <Layout/>,
    children: [
    {  
      path: "my-courses/learning",
      element: <MyLearning/>
    },
    {  
      path: "my-courses/wishlist",
      element: <Wishlist/>
    },
    {  
      path: "my-courses/archived",
      element: <Archived/>
    }]
  },
  {
    path: "/user",
    element: <Layout/>,
    children: [
    {  
      path: "public-profile",
      element: <PublicProfile/>
    },
    {  
      path: "edit-profile",
      element: <EditProfile/>
    },
    {  
      path: "account-settings",
      element: <AccountSettings/>
    },
    {  
      path: "close-account",
      element: <CloseAccount/>
    }]
  },
  {
    path: "/course/:courseId",
    element: <Layout/>,
    children: [
    {
      path: "",
      element: <CourseDetail/>
    }],
  }, {
    path: "/course/:courseId/learn/:videoId",
    element: <CourseLayout/>,
    children: [{
      path: "",
      element: <CourseContent/>
    }]
  } 
]);

export function AppRouterProvider() {
    return <RouterProvider router={router}/>
}