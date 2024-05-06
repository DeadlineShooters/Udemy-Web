import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import eyeOpen from "../../../Assets/eye.png";
import eyeClose from "../../../Assets/eye_close.png";
import axios from "axios";
import { useAuth } from '../../../AuthContextProvider';
import { useForm } from 'react-hook-form';
import secureLocalStorage from 'react-secure-storage';

const Register = () => {
  const {setUser, setIsLogged} = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [isRegisterFailed, setRegisterFailed] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  const [isHidePassword, setHidePassword] = useState(true);
  const handleHidePasswordChange = () => {
    setHidePassword(!isHidePassword);
  };
  const navigate = useNavigate();
  const {register, handleSubmit, watch, formState: {errors}} = useForm({
    mode: "onSubmit"
  });
  const submit = async (data) => {
    try {
      const firstName = data.fullName.split(" ").slice(0, -1).join(" ");
      const lastName = data.fullName.split(" ").slice(-1).join(" ");
      const email = data.email;
      const password = data.password;
      const response = await axios.post("http://localhost:5000/auth/signup", {
        firstName, lastName, email, password
      })
      if (response.status === 200) {
        localStorage.setItem("registerEmail", JSON.stringify(email));
        navigate("/user/verify", {replace: true});
      }
    } catch (err)
    {
      setRegisterFailed(true);
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col w-full items-center pt-20 font-bold text-2xl mb-48'>
      {isRegisterFailed === true ? (
        <div className='px-5 py-2 mb-5 bg-red-300'>
          <p className='text-base'>Your email has been already used. Try another!</p>
        </div>
      ) : (
        ""
      )}
      <p>Register Udemy account & Learn</p>
      <form onSubmit={handleSubmit(submit)}>
        <div className="relative z-0 w-96 mt-6 group">
          <input 
            type="text" 
            name="floating_fullname" 
            id="floating_fullname" 
            className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            {...register("fullName", 
              {
                required: {
                  value: true,
                  message: "Your name is required"
                },
            })} />
            {errors.fullName && <p className='text-base font-medium text-[#b84444]'>{errors.fullName.message}</p>}
          <label htmlFor="floating_fullname" className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Full name</label>
        </div>
        <div className="relative z-0 w-96 mt-2 group">
          <input 
            type="email" 
            name="floating_email" 
            id="floating_email" 
            className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            {...register("email", {
              required: {
                value: true, 
                message: "Your email is required"
              },
              pattern: {
                value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email format"
              }
            })}
          />
          {errors.email && <p className='text-base font-medium text-[#b84444]'>{errors.email.message}</p>}
          <label htmlFor="floating_email" className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email address</label>
        </div>
        <div className="flex flex-row relative items-center z-0 w-96 mt-2 group">
          <input 
            type={isHidePassword ? "password" : "text"} 
            name="floating_password" 
            id="floating_password" 
            className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" "
            {...register("password", { 
              required: {
                value: true,
                message: "Your password is required"
              },
              minLength: {
                value: 8,
                message: "Your password must be longer than 8"
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                message: "Your password must include at least one uppercase, one numeric value and one special character"
              }
            })}
          />
          <label htmlFor="floating_password" className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
          <button className="absolute right-0 mx-2 h-5 w-5 bg-white border-spacing-1" type="button" onClick={handleHidePasswordChange}>
            <img src={isHidePassword ? eyeClose : eyeOpen} className="eyeIcon" alt="eyeIcon"></img>
          </button>
        </div>
        {errors.password && <p className='text-base font-medium text-[#b84444] line-clamp-3 w-96'>{errors.password.message}</p>}
        <div className="flex flex-row w-96 mt-2">
          <label className="flex flex-row">
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={handleCheckboxChange} 
              className='w-5 h-5'/>
            <span className="checkmark"></span>
            <div className="text-base font-normal ml-2">By clicking sign-up, you are agreeing to the <Link to="/about-us" className='text-purple-700' target='_blank'>terms of use</Link> and acknowledging the <Link to="/about-us" target='_blank' className='text-purple-700'>privacy policy</Link>.</div>
          </label>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-96 bg-purple-700 text-white py-2 text-xl hover:bg-purple-800">Sign up</button>
        </div>
      </form>
      <hr className="w-96 mt-6 bg-gray-300 h-0.5 "/>
      <div className="flex flex-row text-base w-96">
        <p className='font-normal'>Already have an account?</p>
        <p className='ml-2 hover:cursor-pointer hover:text-purple-700'>
          <Link to="/login">Log in!</Link>
        </p>
      </div>
    </div>
  )
}

export default Register