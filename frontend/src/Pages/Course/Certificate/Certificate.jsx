import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Image, Video } from "cloudinary-react";
import { getColor, createImageFromInitials } from "../../../Components/Utils/Utils.js";
import { IconFileDownload } from '@tabler/icons-react';
import { Button } from "@material-tailwind/react";
import StarRatings from '../../../Components/StarRatings.jsx';
import axios from 'axios';

const Certificate = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getCertificate = async () => {
      try {
        const url = window.location.href;
        const urlParts = url.split("/");
        const cerId = urlParts[urlParts.length - 1];
        await axios.get(`http://localhost:5000/user/get-certificate/${cerId}`)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.certificate);
            setData(response.data.certificate);
          }
        })
      } catch (error) {
        console.error('Error getting certificate:', error);
      }
    }
    getCertificate();
  }, []);
  const ref = useRef(null)
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'certificate.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref]);

  return (
    <div className='flex flex-row ml-20 mt-5 mb-10 overflow-hidden'>
      <div>
        <div ref={ref}>
          <div className='flex flex-row w-[960px] h-[600px] border border-gray-400 bg-white items-center justify-center p-5'>
            <div className='flex flex-col w-full h-full bg-gray-100 p-5'>
              <div className='flex flex-row justify-between items-center'>
                <div>
                  <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId="Udemy-important/udemy-logo" width="120" crop="fit"/>
                </div>
                <div className='flex flex-col justify-end items-end text-sm'>
                  <p>Certificate No. {data?.signature}</p>
                  <p>udemy.co/{data?.signature}</p>
                </div>
              </div>
              <div className='mt-24'>
                <div className='font-sans font-bold text-md text-gray-600'>
                  <p>CERTIFICATE OF COMPLETION</p>
                </div>
                <div className='font-bold font-serif text-4xl max-w-3xl line-clamp-2 my-3'>
                  <p>{data?.course?.name}</p>
                </div>
                <div className='flex flex-row font-sans font-bold text-sm text-gray-600'>
                  <p>Instructors</p>
                  <p className='mx-2 font-bold text-black'>{data?.course?.instructor.firstName + " " + data?.course?.instructor.lastName}</p>
                </div>
              </div>
              <div className='mt-24'>
                <div className='font-sans font-bold text-2xl max-w-3xl line-clamp-2 my-3'>
                  <p>{data?.user?.firstName + " " + data?.user?.lastName}</p>
                </div>
                <div className='flex flex-row font-sans font-bold text-sm text-gray-600'>
                  <p>Date</p>
                  <p className='mx-2 font-bold text-black'>{new Date(data?.completionDate).toLocaleDateString("en-US", {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'})}
                  </p>
                </div>
                <div className='flex flex-row font-sans font-bold text-sm text-gray-600'>
                  <p>Length</p>
                  <p className='mx-2 font-bold text-black'>{data?.course.totalLength} total hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-[960px] line-clamp-4 mt-2'>
          This certificate above verifies that <t className="text-[#4f2d94] font-semibold">{data?.user?.firstName + " " + data?.user?.lastName}</t> successfully 
          completed the course <t className="text-[#4f2d94] font-semibold">{data?.course?.name}</t> on <t>{new Date(data?.completionDate).toLocaleDateString()}</t> as taught by <t className="text-[#4f2d94] font-semibold">{data?.course?.instructor.firstName + " " + data?.course?.instructor.lastName}</t> on Udemy.
          The certificate indicates the entire course was completed as validated by the student. The course duration represents the total video hours of the course at time of most recent completion.
        </div>
      </div>
      <div className='flex flex-col ml-5'>
        <div>
          <p className='text-xl font-bold'>Certificate Recipient:</p>
          <div className='flex flex-row items-center my-5'>
            <div className="flex rounded-full">
              <img id="preview" src={createImageFromInitials(100, "Nguyễn Minh Thông", getColor())} alt="profile-pic" className="w-12 h-12 rounded-full" />
            </div>
            <div className='flex flex-col ml-3'>
              <p className='font-bold line-clamp-2 max-w-[200px]'>{data?.user?.firstName + " " + data?.user?.lastName}</p>
              <p className='text-sm text-gray-600 line-clamp-2 max-w-[200px]'>{data?.user?.headline}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[800px]'>
          <p className='text-xl font-bold my-2'>About the Course:</p>
          <div class="bg-white md:w-1/3 pb-8">
            <img class="" src={data?.course?.thumbNail.secureURL} alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">{data?.course?.name}</h3>
              <p class="text-xs truncate text-gray-500">{data?.course?.instructor?.firstName + " " + data?.course?.instructor?.lastName}</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">{data?.course?.avgRating}</span>
                <StarRatings rating={data?.course?.avgRating || 0}/>
                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({data?.course?.totalStudent})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">{data?.course?.totalLength} total hours • {data?.course?.totalLecture} lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span>$</span>
                  {0.8*(data?.course?.price)}
                </span>
                <span class="text-gray-500 line-through">
                  <span>$</span>
                  {data?.course?.price}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button color="white" className="flex flex-row border border-black rounded-none hover:bg-violet-800" style={{ height: "48px" }} onClick={onButtonClick}>
            <IconFileDownload />
            <span className="font-bold text-base normal-case">Download</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Certificate