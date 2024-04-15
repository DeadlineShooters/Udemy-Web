import React from 'react'
import { Link, useLocation } from "react-router-dom";
import './Archived.css';

const Archived = () => {
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
      <div className="lower">
        <h2>Archived</h2>
      </div>
    </div>
  )
}

export default Archived;