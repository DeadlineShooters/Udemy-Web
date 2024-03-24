import React from 'react';
import RatingStars from './RatingStars';


const courseImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const CourseCard = (instructorInfo) => {
    return (
        <div className="w-full">
            <img src={courseImage} alt="" />
            <p className="font-bold"><span>[NEW] </span>Ultimate AWS Certified Cloud Practitioner CLF-C02</p>
            <p className="text-xs text-neutral-500">Stephane Maarek | AWS Certified Cloud...</p>
            <div className='flex items-center gap-2'>
                <span className='font-bold'>4.7</span>
                <RatingStars rating={3}/>
                <span className="text-xs text-neutral-500">(197,359)</span>
            </div>
            <div className="text-xs text-neutral-500	">15 total hours - 281 lectures - Beginner</div>
            <div className="font-bold my-1">đ399,000 đ2,199,000</div>
            <div className="inline text-xs px-2 py-1 bg-amber-200 font-bold">Bestseller</div>
        </div>
    );
}

export default CourseCard;