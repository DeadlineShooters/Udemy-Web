import React from 'react'
import {getColor,createImageFromInitials} from '../../../Components/Utils/Utils.js';
import { Link, useLocation } from "react-router-dom";
import './accountSettings.css'

const AccountSettings = () => {
  const user = {
    firstName: "Nguyen Minh",
    lastName: "Thong",
    heading: "Software engineer",
    description: "",
    email: "tomato09@gmail.com",
    password: "",
    website: {
      fb: "",
      yb: "",
      link: "",
    }
  };
  let fullname = user.firstName + " " + user.lastName;
  return (
    <div className="template flex flex-row pt-8">
      <div className="flex flex-col border border-r-0 border-[#A6A6A6]" style={{height: "40rem"}}>
        <div className='p-10'>
          <div className="flex rounded-full justify-center">
            <img id="preview" src={createImageFromInitials(160, fullname, getColor())} alt="profile-pic" className="avatar"/>
          </div>
          <p className="text-xl mt-3 font-bold text-center">{fullname}</p>
          <p className="text-lg italic text-center text-gray-500">{user.heading}</p>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-black ">
          <Link to="/user/edit-profile">User profile</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-black bg-purple-900 text-white font-bold">
          <Link to="/user/account-settings">Account settings</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-black">
          <Link to="/user/close-account">Close account</Link>
        </div>
      </div>
      <div className="flex flex-col border border-black w-1/2" style={{height: "40rem"}}>
        <div className="border border-l-0 border-r-0 border-t-0 border-black text-center p-3">
          <p className='font-bold text-2xl'>Account settings</p>
          <p className='text-base mt-2 lg:text-sm'>Edit your account settings and change your password here</p>
        </div>
        <div className="flex flex-col border border-x-0 border-t-0 border-black">
          <p className='font-bold px-12 pt-5'>Email:</p>
          <div className='w-full px-12 pt-2 pb-5'>
            <div className="flex w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readOnly>
              <p className='text-sm'>Your email address is: </p> <p className='font-bold ml-2'>{user.email}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row pt-5 pb-5 border border-x-0 border-t-0 border-black items-center'>
          <p className='font-bold pl-12 pr-5'>Language:</p>
          <form>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>English (US)</option>
              <option>Vietnamese</option>
              <option>France</option>
              <option>Germany</option>
            </select>
          </form>
        </div>
        <div className='flex flex-col'>
          <p className='font-bold px-12 pt-2'>Change password:</p>
          <form className='w-full px-12 pt-2'>
            <input type="password" id="new-password" className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter new password'/>
          </form>
          <form className='w-full px-12 pt-2'>
            <input type="password" id="re-enter-password" className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Re-type new password'/>
          </form>
        </div>
        <div className='pl-12 pt-5'>
          <button type="button" className="text-white bg-purple-900 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change password</button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings