import React from 'react';
import {getColor,createImageFromInitials} from '../../../Components/Utils/Utils.js';
import { Link, useLocation } from "react-router-dom";
import './closeAccount.css';

const CloseAccount = () => {
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
    <div class="template flex flex-row pt-8">
      <div class="flex flex-col border border-r-0 border-slate-500" style={{height: "40rem"}}>
        <div class='p-10'>
          <div class="flex rounded-full justify-center">
            <img id="preview" src={createImageFromInitials(160, fullname, getColor())} alt="profile-pic" className="avatar"/>
          </div>
          <p class="text-xl mt-3 font-bold text-center">{fullname}</p>
          <p class="text-lg italic text-center text-gray-500">{user.heading}</p>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-slate-500 ">
          <Link to="/user/edit-profile">User profile</Link>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-slate-500">
          <Link to="/user/account-settings">Account settings</Link>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-slate-500 bg-sky-950 text-white font-bold">
          <Link to="/user/close-account">Close account</Link>
        </div>
      </div>
      <div class="flex flex-col border border-slate-500 w-1/2" style={{height: "40rem"}}>
        <div class="border border-l-0 border-r-0 border-t-0 border-slate-500 text-center p-3">
          <p class='font-bold text-2xl'>Account settings</p>
          <p class='text-base mt-2'>Edit your account settings and change your password here</p>
        </div>
        <div class="flex flex-col">
          <div class='w-full px-12 pt-5 pb-5'>
            <div class="flex w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readOnly>
              <p class='text-sm font-bold text-red-600'>Warnings:</p> 
              <p class='ml-2'>If you close your account, you will be unsubcribed from your all courses, and lose access forever.</p>
            </div>
          </div>
        </div>
        <div class='pl-12'>
          <button type="button" class="text-white bg-sky-950 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Close account</button>
        </div>
      </div>
    </div>
  )
}

export default CloseAccount;