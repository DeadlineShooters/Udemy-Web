import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/home.jsx';
import Register from "./Components/Pages/register.jsx";
import Login from "./Components/Pages/login.jsx";
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;