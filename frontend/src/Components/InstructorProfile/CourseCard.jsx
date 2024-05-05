import React from 'react';
import RatingStars from './RatingStars';
import { useNavigate } from "react-router-dom";



const courseImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const CourseCard = ({ user, course }) => {
	const navigate = useNavigate();
    
    return (
        <div className="w-full cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
            <img src={courseImage} alt="" />
            <p className="font-bold"><span>[NEW] </span>{course.name}</p>
            <p className="text-xs text-neutral-500">{user.firstName + " " + user.lastName}</p>
            <div className='flex items-center gap-2'>
                <span className='font-bold'>{course.avgRating}</span>
                <RatingStars rating={course.avgRating}/>
                <span className="text-xs text-neutral-500">({course.oneStarCnt + course.twoStarCnt + course.threeStarCnt + course.fiveStarCnt + course.fourStarCnt})</span>
            </div>
            <div className="text-xs text-neutral-500	">{course.totalLength} total hours - {course.totalLecture} lectures</div>
            <div className="font-bold my-1">{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            {/* <div className="inline text-xs px-2 py-1 bg-amber-200 font-bold">Bestseller</div> */}
        </div>
    );
}

export default CourseCard;