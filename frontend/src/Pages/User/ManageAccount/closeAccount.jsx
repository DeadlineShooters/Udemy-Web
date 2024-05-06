import React from "react";
import { getColor, createImageFromInitials } from "../../../Components/Utils/Utils.js";
import { Link, useLocation } from "react-router-dom";
import "./closeAccount.css";
import { useAuth } from "../../../AuthContextProvider.jsx";

const CloseAccount = () => {
  const { userData } = useAuth();
  let fullname = userData.firstName + " " + userData.lastName;
  return (
    <div className="template flex flex-row mt-8 mb-12">
      <div className="flex flex-col border border-r-0 border-black" style={{ height: "40rem" }}>
        <div className="p-10">
          <div className="flex rounded-full justify-center">
            <img id="preview" src={createImageFromInitials(160, fullname, getColor())} alt="profile-pic" className="avatar" />
          </div>
          <p className="text-xl mt-3 font-bold text-center">{fullname}</p>
          <p className="text-lg italic text-center text-gray-500">{userData.heading}</p>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-black ">
          <Link to="/user/edit-profile">User profile</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-black">
          <Link to="/user/account-settings">Account settings</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-black bg-gray-800 text-white font-bold">
          <Link to="/user/close-account">Close account</Link>
        </div>
      </div>
      <div className="flex flex-col border border-black w-1/2" style={{ height: "40rem" }}>
        <div className="border border-l-0 border-r-0 border-t-0 border-black text-center p-3">
          <p className="font-bold text-2xl">Account settings</p>
          <p className="text-base mt-2">Edit your account settings and change your password here</p>
        </div>
        <div className="flex flex-col">
          <div className="w-full px-12 pt-5 pb-5">
            <div
              className="flex w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              readOnly
            >
              <p className="text-sm font-bold text-red-600">Warnings:</p>
              <p className="ml-2">If you close your account, you will be unsubcribed from your all courses, and lose access forever.</p>
            </div>
          </div>
        </div>
        <div className="pl-12">
          <button
            type="button"
            className="text-white bg-purple-900 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Close account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseAccount;
