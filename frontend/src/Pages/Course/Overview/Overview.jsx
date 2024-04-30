import React, { useEffect, useState } from 'react';
import { getColor, createImageFromInitials } from '../../../Components/Utils/Utils';
import './Overview.css';
import axios from 'axios';

const CourseOverview = () => {
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [totalStudent, setTotalStudent] = useState("");
  const [totalLecture, setTotalLecture] = useState("");
  const [totalSection, setTotalSection] = useState("");
  const [totalLength, setTotalLength] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [headline, setHeadline] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const [, , , ,slugName, , tail] = url.split("/");
    const [lectureIndex, hash] = tail.split("#");
    axios.post("http://localhost:5000/user/course/section/lecture", {lectureIndex, slugName})
    .then((response) => {
      if (response.data.success) {
        const course = response.data.data.course[0];
        setDescription(course.description);
        setIntroduction(course.introduction);
        setFirstName(course.instructor.firstName);
        setLastName(course.instructor.lastName);
        setBio(course.instructor.bio);
        setHeadline(course.instructor.headline);
        setTotalLecture(course.totalLecture);
        setTotalSection(course.totalSection);
        setTotalStudent(course.totalStudent);
        setTotalLength(course.totalLength);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])
  return (
    <div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-col ml-5 mt-5'>
        <div className='font-bold text-2xl mb-5'>About this course</div>
        <div className='text-lg mb-5'>{introduction}</div>
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5'>
        <div className='text-lg mb-5 mr-40'>By the numbers</div>
        <div className='flex flex-col text-lg mb-5 mr-40'>
          <div>Skill levels: All levels</div>
          <div>Students: {totalStudent}</div>
          <div>Languages: English</div>
        </div>
        <div className='flex flex-col text-lg mb-5'>
          <div>Lectures: {totalLecture}</div>
          <div>Sections: {totalSection}</div>
          <div>Video: {totalLength} total hours</div>
        </div>
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5 w-[60rem]'>
        <div className='text-lg mb-5 mr-48'>Description</div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5 w-[60rem]'>
        <div className='text-lg mr-52'>Instructor</div>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center mb-5'>
            <div className="flex w-[40px] mr-5">
              <img id='preview' src={createImageFromInitials(160, firstName + " " + lastName, getColor())} alt='profile-pic' className='avatar' />
            </div>
            <div className='flex flex-col'>
              <div className='text-lg font-bold'>{firstName + " " + lastName}</div>
              <div className='text-lg'>{headline}</div>
            </div>  
          </div>
          <div className='text-lg mb-5'>{bio}</div>
        </div>
      </div>
    </div>
  )
}

export default CourseOverview