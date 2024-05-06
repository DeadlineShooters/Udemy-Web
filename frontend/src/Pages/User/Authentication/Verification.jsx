import { Button } from '@material-tailwind/react'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { IconMail } from '@tabler/icons-react';
import { Image } from 'cloudinary-react';

const Verification = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const navigateToEmail = () => {
    // Open email link in a new tab
    window.open("https://mail.google.com/mail/signin", "_blank");

    // Redirect current tab to the login page
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const getRegisterEmail = () => {
      const email = JSON.parse(localStorage.getItem("registerEmail"));
      if (email) {
        setEmail(email);
      }
    }
    getRegisterEmail();
  }, [])
  return (
    <div className='flex flex-col w-full items-center pt-20 mb-20'>
      <div className='flex flex-col border border-gray-500 rounded-lg justify-center items-center space-y-6 space-x-2 py-10 w-[520px]'>
        <div>
          <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId="Udemy-important/email-confirm" width="200" crop="fit"/>
        </div>
        <p className='font-bold text-2xl'>Account Confirmation</p>
        <div className='flex flex-col items-center justify-center text-md font-normal max-w-md text-center'>
          <p>We have sent an email to <span className="text-[#5535ad] font-bold">{email}</span> to confirm the validity of your email address. After receiving the email, follow the link provided to complete your registration.</p>
        </div>
        <div className='flex flex-row space-x-2'>
          <Button
            color="purple"
            className="flex flex-row rounded-none hover:bg-violet-800"
            style={{ height: "48px" }}
            onClick={navigateToEmail}>
            <IconMail stroke={2} />
            <span className="ml-2 font-bold text-base normal-case">CLICK TO VERIFY</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
