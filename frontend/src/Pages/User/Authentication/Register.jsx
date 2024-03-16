import React, {useState} from 'react';
import { Link } from "react-router-dom";
import eyeOpen from "../../../Assets/eye.png";
import eyeClose from "../../../Assets/eye_close.png";

const Register = () => {
  const [isChecked, setChecked] = useState(true);
  const handleCheckboxChange = () => {
      setChecked(!isChecked);
  };
  const [isHidePassword, setHidePassword] = useState(true);
  const handleHidePasswordChange = () => {
      setHidePassword(!isHidePassword);
  };
  const showText = () => {
    console.log("Clicked");
  }
  return (
    <div class='flex flex-col w-full items-center pt-20 font-bold text-2xl'>
      <p>Register Udemy account & Learn</p>
      <form>
        <div class="relative z-0 w-96 mt-6 group">
          <input type="text" name="floating_username" id="floating_username" class="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_username" class="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">User name</label>
        </div>
        <div class="relative z-0 w-96 mt-2 group">
          <input type="email" name="floating_email" id="floating_email" class="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_email" class="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email address</label>
        </div>
        <div class="flex flex-row relative items-center z-0 w-96 mt-2 group">
          <input type={isHidePassword ? "password" : "text"} name="floating_password" id="floating_password" class="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  />
          <label for="floating_password" class="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
          <button className="absolute right-0 mx-2 h-5 w-5 bg-white border-spacing-1" type="button" onClick={handleHidePasswordChange}>
            <img src={isHidePassword ? eyeClose : eyeOpen} className="eyeIcon" alt="eyeIcon"></img>
          </button>
        </div>
        <div class="flex flex-row w-96 mt-2">
          <label class="flex flex-row">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} class='w-5 h-5'/>
            <span class="checkmark"></span>
            <div class="text-base font-normal ml-2">By clicking sign-up, you are agreeing to the <Link to="/about-us" class='text-purple-700' target='_blank'>terms of use</Link> and acknowledging the <Link to="/about-us" target='_blank' class='text-purple-700'>privacy policy</Link>.</div>
          </label>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-96 bg-purple-700 text-white py-2 text-xl hover:bg-purple-800" onClick={showText}>Sign up</button>
        </div>
      </form>
      <hr class="w-96 mt-6 bg-gray-300 h-0.5 "/>
      <div class="flex flex-row text-base w-96">
        <p class='font-normal'>Already have an account?</p>
        <p class='ml-2 hover:cursor-pointer hover:text-purple-700'>
          <Link to="/login">Log in!</Link>
        </p>
      </div>
    </div>
  )
}

export default Register