import React, {useState, useEffect, useRef} from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link, useLocation } from "react-router-dom";
import './Navbar.css'
import logo from '../../Assets/Udemy_logo.png'
import heart from "../../Assets/heart.png"
import cart from "../../Assets/cart.png"
import {getColor,createImageFromInitials} from '../Utils/Utils.js'
import { useAuth } from '../../AuthContextProvider.jsx';
import { IconMenu2 } from '@tabler/icons-react';
import { IconChevronLeft } from '@tabler/icons-react';

const Navbar = () => {
  const user = useAuth();
  console.log(user);
  const isLogged = user.userData !== null;
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const logout = () => {
    localStorage.clear();
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  const [isTurnOnSideBar, setTurnOnSideBar] = useState(false);
  const sideBarToggle = () => {
    setTurnOnSideBar(!isTurnOnSideBar);
    console.log(isTurnOnSideBar);
  };
  const userName = "Nguyen Minh Thong";
  return (
    <div className='header'>
      <div className='navbar justify-between max-md:justify-center'>
        <div className='flex items-center max-md:w-full'>
          <button type="button" className="md:hidden z-9999" onClick={sideBarToggle}>
            <IconMenu2 stroke={2} />
          </button>
          <div className="max-md:m-auto">
            <Link to="/"><img src={logo} alt='' className='logo'></img></Link>
          </div>
          <ul className="mx-5 max-md:hidden">
              <li>Categories</li>
          </ul>
          <form className="max-md:hidden">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for anything..." required />
                  <button type="submit" className="text-white absolute end-2 bottom-1.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
          </form>
        </div>
        { isLogged === true ? 
          (
          <div className={`flex items-center`}>
            <ul>
              <li className='hover:text-purple-700 hide-teach-udemy'>Teach on Udemy</li>
              <li className='hover:text-purple-700 hide-my-learning'><Link to="/home/my-courses/learning">My learning</Link></li>
            </ul>
            <img src={heart} alt='Wishlist' className='wishlist mx-4 max-md:hidden'></img>
            <img src={cart} alt='Cart' className='cart mx-4 max-md:hidden'></img>
            <Menu as="div" className="relative ml-4 max-md:hidden">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img id="preview" src={createImageFromInitials(40, userName, getColor())} alt="profile-pic" className="avatar"/>
                </Menu.Button>
              </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/user/public-profile" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          My public profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/home/my-courses/learning" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          My learning
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/home/my-courses/wishlist" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Wishlist
                        </a>
                      )}
                    </Menu.Item>
                    <hr/>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/user/edit-profile" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Edit profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/user/account-settings" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <hr/>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={logout} className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                    <hr/>
                    <div className='flex flex-row justify-between'>
                      <a href="/about-us" className={classNames('px-4 py-2 text-xs text-gray-600')}>
                        About Udemy
                      </a>
                      <a href="/help" className={classNames('px-4 py-2 text-xs text-gray-600')}>
                        Help
                      </a>
                    </div>
                  </Menu.Items>
              </Transition>
            </Menu>
          </div> 
          ) 
          : 
          (
            <div className={`flex items-center max-md:hidden`}>
              <button className={`bg-white hover:bg-gray-200 text-black font-bold py-1 px-4 max-lg:px-2 border-2 border-gray-900 rounded mx-2`}>
                <Link to="/login">Login</Link>
              </button>
              <button className={`bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 px-4 border-2 max-lg:px-1 border-gray-900 rounded`}>
                <Link to="/register">Sign up</Link>
              </button>
            </div>
          )
        }
      </div>
      {isLogged === true ?
        <div className={`sidebar md:hidden ${isTurnOnSideBar ? "open" : "" } border-r-2 shadow-xl`}>
          <div className='flex flex-row items-center bg-slate-50 py-2'>
            <div className="flex rounded-full text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-5">
              <img id="preview" src={createImageFromInitials(80, userName, getColor())} alt="profile-pic" className="avatar"/>
            </div>
            <div className='flex flex-col ml-5'>
              <p className='font-bold'>Hi, {userName} </p>
              <p className=''>Welcome back</p>
            </div>
          </div>
          <hr/>
          <div className='ml-5 py-3'>
            <p className='font-bold text-violet-600'>Teach on Udemy</p>
          </div>
          <hr/>
          <div className='ml-5 py-3'>
            <Link to="/home/my-courses/learning"><p className='font-bold mb-3'>My learning</p></Link>
            <Link to="/home/my-courses/wishlist"><p className='font-bold mb-3'>Wishlist</p></Link>
          </div>
          <hr/>
          <div className='ml-5 py-3'>
            <p className='font-bold mb-3'>Account</p>
            <Link to="/user/edit-profile"><p className='mb-3'>Edit profile</p></Link>
            <Link to="/user/account-settings"><p className='mb-3'>Account settings</p></Link>
          </div>
          <hr/>
          <div className='ml-5 py-3'>
            <p className='font-bold mb-3'>Logout</p>
          </div>
          <hr/>
          <div className='ml-5 py-3'>
            <p className='font-bold mb-3'>More about Udemy</p>
            <Link to="/about-udemy"><p className='mb-3'>About us</p></Link>
            <Link to="/help"><p className='mb-3'>Help</p></Link>
          </div>
          <hr/>
          <button type="button" className='w-20 h-10 bg-slate-700 rounded-full flex items-center ml-5 mt-10 z-9999' onClick={() => setTurnOnSideBar()}>
            <IconChevronLeft stroke={2} className='flex justify-center w-full' color='white' />
          </button>
        </div> 
        : 
        (
          <div className={`sidebar md:hidden ${isTurnOnSideBar ? "open" : "" } border-r-2 shadow-xl`}>
            <div className='ml-5 py-3'>
              <Link to="/login"><p className='font-bold mb-3'>Login</p></Link>
              <Link to="/register"><p className='font-bold mb-3'>Sign up</p></Link>
            </div>
            <hr/>
            <div className='ml-5 py-3'>
              <p className='font-bold mb-3'>More about Udemy</p>
              <Link to="/about-udemy"><p className='mb-3'>About us</p></Link>
              <Link to="/help"><p className='mb-3'>Help</p></Link>
            </div>
            <hr/>
            <button type="button" className='w-20 h-10 bg-slate-700 rounded-full flex items-center ml-5 mt-10 z-9999' onClick={() => setTurnOnSideBar()}>
              <IconChevronLeft stroke={2} className='flex justify-center w-full' color='white' />
            </button>
          </div>
        )
      }
        
      <div className='divider'>
        <hr/>
      </div>
    </div>
  )
}

export default Navbar