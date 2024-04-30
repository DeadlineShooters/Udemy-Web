import React from 'react';
import { getColor, createImageFromInitials } from '../../../Components/Utils/Utils';
import './Overview.css';

const CourseOverview = ({course}) => {
  return (
    <div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-col ml-5 mt-5'>
        <div className='font-bold text-2xl mb-5'>About this course</div>
        <div className='text-lg mb-5'>{course.introduction}</div>
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5'>
        <div className='text-lg mb-5 mr-40'>By the numbers</div>
        <div className='flex flex-col text-lg mb-5 mr-40'>
          <div>Skill levels: All levels</div>
          <div>Students: {course.totalStudent}</div>
          <div>Languages: English</div>
        </div>
        <div className='flex flex-col text-lg mb-5'>
          <div>Lectures: {course.totalLecture}</div>
          <div>Sections: {course.totalSection}</div>
          <div>Video: {course.totalLength} total hours</div>
        </div>
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5 w-[60rem]'>
        <div className='text-lg mb-5 mr-48'>Description</div>
        <div dangerouslySetInnerHTML={{ __html: course.description }} />
        
      </div>
      <hr className="border-[0.5px] border-gray-300"/>
      <div className='flex flex-row ml-5 mt-5 w-[60rem]'>
        <div className='text-lg mr-52'>Instructor</div>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center mb-5'>
            <div className="flex w-[40px] mr-5">
              <img id='preview' src={createImageFromInitials(160, course.instructor.firstName + " " + course.instructor.lastName, getColor())} alt='profile-pic' className='avatar' />
            </div>
            <div className='flex flex-col'>
              <div className='text-lg font-bold'>{course.instructor.firstName + " " + course.instructor.lastName}</div>
              <div className='text-lg'>{course.instructor.headline}</div>
            </div>  
          </div>
          <div className='text-lg mb-5'>{course.instructor.bio}</div>
        </div>
      </div>
    </div>
  )
}

export default CourseOverview