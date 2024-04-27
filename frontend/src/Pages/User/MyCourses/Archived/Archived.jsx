import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import './Archived.css';
import { useAuth } from '../../../../AuthContextProvider';

const Archived = () => {
  const {userData} = useAuth();
  const [archivedList, setArchivedList] = useState([]);

  useEffect(() => {
    const getArchivedList = () => {
      setArchivedList(userData.archivedCourse);
    }
    getArchivedList();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="upper-archived">
          <h1 class="title text-5xl font-bold pt-10 pb-10">My learning</h1>
          <div className='filter flex items-center'>
            <button class="text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button class="text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button class="text-white hover:bg-purple-900 border-b-8 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/archived">Archived</Link>
            </button>
          </div>
      </div>
      <div className="lower-archived">
        {archivedList.length === 0 && (
          <div className='flex flex-col items-center my-20'>
            <h2 className='text-xl font-bold'>Focus on only the courses that matter to you.</h2>
            <h2 className='flex flex-row text-xl'><p className='text-[#5037b5] font-bold mr-2 underline hover:cursor-pointer' onClick={() => navigate("/home/my-courses/learning")}>Go to the All Courses</p> tab to archive. </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Archived;