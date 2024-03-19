import React, {useState, useEffect} from 'react'
import google_icon from "../../../Assets/google.png";
import facebook_icon from "../../../Assets/facebook.png";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../../AuthContextProvider';

const Login = () => {
  const [isChecked, setChecked] = useState(true);
  const {setUser, setIsLogged} = useAuth();
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [isLoginGoogleFailed, setLoginGoogleFailed] = useState(false);
  let features = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=no,height=600,width=400';
  const googleAuth = () => {
    const popup = window.open("http://localhost:5000/auth/google", "_blank", features);
    popup.postMessage("message", "http://localhost:3000/login");
    window.addEventListener("message", (event) => {
      if (event.data === "Exit") {
        popup.close();
        window.location.href = "http://localhost:3000/home";
      }
      if (event.data === "Failed") {
        popup.close();
        setLoginGoogleFailed(true);
      }
    });
  }
  const facebookAuth = () => {
    const popup = window.open("http://localhost:5000/auth/facebook", "_blank", features);
    popup.postMessage("message", "http://localhost:3000/login");
    window.addEventListener("message", (event) => {
      if (event.data === "Exit") {
        popup.close();
        window.location.href = "http://localhost:3000/home";
      }
      if (event.data === "Failed") {
        popup.close();
        setLoginGoogleFailed(true);
      }
    });
  }
  const SendMessage = () => {
    window.opener.postMessage("Exit", "http://localhost:3000/login");
  }
  useEffect(() => {
    const closePopUp = () => {
      if (!window.opener) {
        window.close();
      } else {
        SendMessage();
      }
    }
    closePopUp();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email, password
      })
      console.log(response.data);
      if (response.status === 200) {
        const {userData } = await response.data;
        setUser(userData);
        setIsLogged(true);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate("/home", {replace: true});
      }
    } catch (err)
    {
      setLoginFailed(true);
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col w-full items-center pt-20 font-bold text-2xl'>
      {isLoginGoogleFailed === true ? (
        <div className='px-5 py-2 mb-5 bg-red-300'>
          <p className='text-base'>Registered email must match Gmail. Try again!</p>
        </div>
      ) : (
        ""
      )}
      {isLoginFailed === true ? (
        <div className='px-5 py-2 mb-5 bg-red-300'>
          <p className='text-base'>Your email or password is incorrect. Try again!</p>
        </div>
      ) : (
        ""
      )}
      <p>Login to Your Udemy Account</p>
      <form className='flex flex-col w-full items-center' onSubmit={submit}>
        <div className='flex flex-row items-center border border-slate-800 py-2 px-2 w-96 mt-4 text-lg hover:bg-gray-100 cursor-pointer' onClick={googleAuth}>
          <img src={google_icon} className='px-3' alt="google_icon"/>
          <p>Continue with Google</p>
        </div>
        <div className='flex flex-row items-center border border-slate-800 py-2 px-2 w-96 mt-2 text-lg hover:bg-gray-100 cursor-pointer' onClick={facebookAuth}>
          <img src={facebook_icon} className='px-3' alt="fb_icon"/>
          <p>Continue with Facebook</p>
        </div>
        <p className='my-4 text-lg'>or using your mail</p>
        <div className="relative z-0 w-96 mb-2 group">
          <input type="email" name="floating_email" id="floating_email" className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => {setEmail(e.target.value)}}/>
          <label htmlFor="floating_email" className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email address</label>
        </div>
        <div className="relative z-0 w-96 mb-2 group">
          <input type="password" name="floating_password" id="floating_password" className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => {setPassWord(e.target.value)}}/>
          <label htmlFor="floating_password" className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
        </div>
        <div className="flex flex-row justify-between w-96">
          <label className="flex flex-row items-center">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className='w-4 h-4'/>
            <span className="checkmark"></span>
            <div className="text-base font-normal ml-2">Remember me</div>
          </label>
          <div className="text-base font-normal hover:cursor-pointer hover:text-purple-700">
            Forgot password?
          </div>
        </div>
          <button type='submit' className="w-96 bg-purple-700 text-white py-2 text-xl mt-6 hover:bg-purple-800">Login</button>
      </form>
      <hr className="w-96 mt-6 bg-gray-300 h-0.5 "/>
      <div className="flex flex-row text-base w-96">
        <p className='font-normal'>Don't have any account?</p>
        <p className='ml-2 hover:cursor-pointer hover:text-purple-700'>
          <Link to="/register">Register now!</Link>
        </p>
      </div>
    </div>
  )
}

export default Login