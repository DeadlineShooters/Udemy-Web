import { Button } from '@material-tailwind/react'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { IconLogin2 } from '@tabler/icons-react';
import { Image } from 'cloudinary-react';

const SuccessVerify = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full items-center pt-20 mb-20'>
      <div className='flex flex-col border border-gray-500 rounded-lg justify-center items-center space-y-6 space-x-2 py-10 w-[520px]'>
        <div>
          <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId="Udemy-important/email-success" width="200" crop="fit"/>
        </div>
        <p className='font-bold text-2xl'>Successfully Verification</p>
        <div className='flex flex-col items-center justify-center text-md font-normal max-w-md text-center'>
          <p>Congratulations! Your email has been successfully validated. You are now part of our community of enthusiastic learners.</p>
        </div>
        <div className='flex flex-row space-x-2'>
          <Button
            color="purple"
            className="flex flex-row rounded-none hover:bg-violet-800"
            style={{ height: "48px" }}
            onClick={() => navigate("/login", {replace: true})}>
            <IconLogin2 stroke={2} />
            <span className="ml-2 font-bold text-base normal-case">LOGIN NOW</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SuccessVerify;