import React from 'react';
import {getColor,createImageFromInitials} from '../../../Components/Utils/Utils.js';
import { Link, useLocation } from "react-router-dom";
import './closeAccount.css';

const CloseAccount = () => {
  let username = "Nguyen Minh Thong"; //Handle retrieve user data later
  return (
    <div class="template flex flex-row pt-8">
      <div class="flex flex-col border border-r-0 border-slate-500" style={{height: "40rem"}}>
        <div class='p-10'>
          <div class="relative flex items-center rounded-full">
            <img id="preview" src={createImageFromInitials(160, username, getColor())} alt="profile-pic" className="avatar"/>
          </div>
          <p class="text-xl mt-3 font-bold text-center">Tomato Group 09</p>
          <p class="text-lg italic text-center text-gray-500">Software engineer</p>
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
        <div class="border border-l-0 border-r-0 border-t-0 border-slate-500 text-center p-5">
          <p class='font-bold text-3xl'>Close account</p>
          <p class='text-lg mt-2'>Close your account permanently</p>
        </div>
      </div>
    </div>
  )
}

export default CloseAccount;