import React, { useState } from "react";
import { getColor, createImageFromInitials } from "../../../Components/Utils/Utils.js";
import { Link } from "react-router-dom";
import "./editProfile.css";
import { useAuth } from "../../../AuthContextProvider.jsx";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const EditProfile = () => {
  /* Retrieve user data */
  const { userData, setUser } = useAuth();
  let fullname = userData.firstName + " " + userData.lastName;

  /* Get user data */
  const userId = userData._id;
  const [userFirstName, setUserFirstName] = useState(userData.firstName);
  const [userLastName, setUserLastName] = useState(userData.lastName);
  const [userHeading, setUserHeading] = useState(userData.heading);
  const [userBio, setUserBio] = useState(userData.bio);
  const [userWeb, setUserWeb] = useState(userData.socialLinks.web);
  const [userFb, setUserFb] = useState(userData.socialLinks.youtube);
  const [userYtb, setUserYtb] = useState(userData.socialLinks.facebook);
  const successNotify = () => {
    toast.success("Updated successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/edit-profile", {
        userId,
        userFirstName,
        userLastName,
        userHeading,
        userBio,
        userWeb,
        userFb,
        userYtb,
      });
      console.log("Data cap nhat: ", response.data);
      if (response.status === 200) {
        successNotify();
        const userData = await response.data;
        setUser(userData);
        secureLocalStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="template flex flex-row pt-8">
      <div className="flex flex-col border border-r-0 border-black" style={{ height: "40rem" }}>
        <div className="p-10">
          <div className="flex rounded-full justify-center">
            <img id="preview" src={createImageFromInitials(160, fullname, getColor())} alt="profile-pic" className="avatar" />
          </div>
          <p className="text-xl mt-3 font-bold text-center">{fullname}</p>
          <p className="text-lg italic text-center text-gray-500">{userData.header}</p>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-black bg-gray-800 text-white font-bold">
          <Link to="/user/edit-profile">User profile</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-black">
          <Link to="/user/account-settings">Account settings</Link>
        </div>
        <div className="pl-10 py-2 border border-l-0 border-r-0 border-t-0 border-black">
          <Link to="/user/close-account">Close account</Link>
        </div>
      </div>
      <div className="flex flex-col border border-black w-1/2" style={{ height: "40rem" }}>
        <div className="border border-l-0 border-r-0 border-t-0 border-black text-center p-3">
          <p className="font-bold text-2xl">Edit profile</p>
          <p className="text-base mt-2">Add more information about yourself</p>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-bold px-12 pt-2">Basics:</p>
            <form className="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userData.firstName}
                placeholder="User's first name"
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </form>
            <form className="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userData.lastName}
                placeholder="User's last name"
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </form>
            <form className="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userData.header}
                placeholder="User's heading"
                onChange={(e) => setUserHeading(e.target.value)}
              />
            </form>
          </div>
          <div className="flex flex-col">
            <p className="font-bold px-12 pt-2">Description:</p>
            <form className="px-12 pt-2">
              <textarea
                id="message"
                rows="4"
                className="block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="User's description"
                defaultValue={userData.bio}
                onChange={(e) => setUserBio(e.target.value)}
              />
            </form>
          </div>
          <div className="flex flex-col">
            <p className="font-bold px-12 pt-2">Links:</p>
            <form className="w-full px-12 pt-2">
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Website (http(s)://..)"
                defaultValue={userData.socialLinks.web}
                onChange={(e) => setUserWeb(e.target.value)}
              />
            </form>
            <form className="w-full px-12 pt-2">
              <div className="flex">
                <span className="inline-flex items-center text-left pl-3 pr-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-500 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <p>http://www.facebook.com/</p>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Facebook Profile"
                  defaultValue={userData.socialLinks.facebook}
                  onChange={(e) => setUserFb(e.target.value)}
                />
              </div>
            </form>
            <form className="w-full px-12 pt-2">
              <div className="flex">
                <span className="inline-flex items-center text-left pl-3 pr-3.5 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-500 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <p>http://www.youtube.com/</p>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Youtube Profile"
                  defaultValue={userData.socialLinks.youtube}
                  onChange={(e) => setUserYtb(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="pl-12 pt-5">
            <button
              type="button"
              className="text-white bg-[#31145b] hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={submit}
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
