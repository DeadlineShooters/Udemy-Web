import Navbar from './Components/Navbar/Navbar';
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
import {createBrowserRouter, RouterProvider, Routes, Route, Outlet} from 'react-router-dom'
import './App.css';

const Layout = () => {
  return(
    <>
      <Navbar/>
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
    ]
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
    path: "/home/my-courses",
    element: <Layout/>,
    children: [
      {  
        path: "learning",
        element: <MyLearning/>
      },
      {  
        path: "wishlist",
        element: <Wishlist/>
      },
      {  
        path: "archived",
        element: <Archived/>
      },
    ]
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
      },
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;