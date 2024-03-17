import React from "react";
import { getColor, createImageFromInitials } from "../../../Components/Utils/Utils.js";
import { Link } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const user = {
    firstName: "Nguyen Minh",
    lastName: "Thong",
    heading: "Software engineer",
    description: "",
    website: {
      fb: "",
      yb: "",
      link: "",
    },
  };
  let fullname = user.firstName + " " + user.lastName;
  return (
    <div class="template flex flex-row pt-8">
      <div class="flex flex-col border border-r-0 border-slate-500" style={{ height: "40rem" }}>
        <div class="p-10">
          <div class="flex rounded-full justify-center">
            <img id="preview" src={createImageFromInitials(160, fullname, getColor())} alt="profile-pic" className="avatar" />
          </div>
          <p class="text-xl mt-3 font-bold text-center">{fullname}</p>
          <p class="text-lg italic text-center text-gray-500">{user.heading}</p>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-slate-500 bg-sky-950 text-white font-bold">
          <Link to="/user/edit-profile">User profile</Link>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-slate-500">
          <Link to="/user/account-settings">Account settings</Link>
        </div>
        <div class="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-slate-500">
          <Link to="/user/close-account">Close account</Link>
        </div>
      </div>
      <div class="flex flex-col border border-slate-500 w-1/2" style={{ height: "40rem" }}>
        <div class="border border-l-0 border-r-0 border-t-0 border-slate-500 text-center p-3">
          <p class="font-bold text-2xl">Edit profile</p>
          <p class="text-base mt-2">Add more information about yourself</p>
        </div>
        <div>
          <div class="flex flex-col">
            <p class="font-bold px-12 pt-2">Basics:</p>
            <form class="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                class="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.firstName}
              />
            </form>
            <form class="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                class="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.lastName}
              />
            </form>
            <form class="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                class="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.heading}
              />
            </form>
          </div>
          <div class="flex flex-col">
            <p class="font-bold px-12 pt-2">Description:</p>
            <form class="px-12 pt-2">
              <textarea
                id="message"
                rows="4"
                class="block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                defaultValue={user.description}
              />
            </form>
          </div>
          <div class="flex flex-col">
            <p class="font-bold px-12 pt-2">Links:</p>
            <form class="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                class="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Website (http(s)://..)"
                defaultValue={user.website.link}
              />
            </form>
            <form class="w-full px-12 pt-2">
              <div class="flex">
                <span class="inline-flex items-center text-left pl-3 pr-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-500 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <p>http://www.facebook.com/</p>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-e-lg bg-gray-50 border border-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Facebook Profile"
                  defaultValue={user.website.fb}
                />
              </div>
            </form>
            <form class="w-full px-12 pt-2">
              <div class="flex">
                <span class="inline-flex items-center text-left pl-3 pr-3.5 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-500 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <p>http://www.youtube.com/</p>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-e-lg bg-gray-50 border border-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Youtube Profile"
                  defaultValue={user.website.yb}
                />
              </div>
            </form>
          </div>
          <div class="pl-12 pt-5">
            <button
              type="button"
              class="text-white bg-sky-950 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
