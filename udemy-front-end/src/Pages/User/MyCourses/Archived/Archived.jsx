import React from 'react'
import { Link, useLocation } from "react-router-dom";
import './Archived.css';

const Archived = () => {
  return (
    <div>
      <div className="upper">
          <h1 class="text-5xl font-bold pl-96 pt-10 pb-10">My learning</h1>
          <div className='flex items-center pl-96'>
            <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg">
              <Link to="/home/my-courses/learning">All courses</Link>
            </button>
            <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg mx-8">
              <Link to="/home/my-courses/wishlist">Wishlist</Link>
            </button>
            <button class="text-white hover:bg-violet-950 border-b-8 font-bold py-2 rounded text-lg">
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