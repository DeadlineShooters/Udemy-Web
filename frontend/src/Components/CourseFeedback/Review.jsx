import React from 'react';
import { createImageFromInitials } from '../Utils/Utils';
import { StarRatings } from '../StarRatings';
import { useState } from 'react';
import InstructorResponse from './InstructorResponse';
import ButtonDefault from './ButtonDefault';

const instructor = {
	firstName: 'Nozo',
	lastName: 'Pham',
	heading: 'Software engineer',
	description: '',
	email: 'tomato09@gmail.com',
};
const Review = ({ review }) => {
	const [showResponse, setShowResponse] = useState(false);
	const [showResponseInput, setShowResponseInput] = useState(false);

	const handleSeeResponseClick = () => {
		setShowResponse((prevShowResponse) => !prevShowResponse);
	};

	const handleRespondClick = () => {
		setShowResponseInput(true);
	};

	const handleCancelClick = () => {
		setShowResponseInput(false);
	};

	const handleSaveClick = () => {};

	return (
		<div className='flex p-4 bg-white shadow rounded-lg items-start justify-between mb-2 '>
			<div className='flex w-4/6 mr-10'>
				<img src={createImageFromInitials(160, review.firstName + ' ' + review.lastName)} alt='avatar' className='w-10 h-10 rounded-full mr-2' />
				<div className='flex flex-col w-full'>
					<div className='flex items-center'>
						<div className='font-bold text-gray-500 text-sm mr-1'>{`${review.firstName} ${review.lastName}`}</div>
						<div className='text-sm text-gray-500'>• {review.date}</div>
					</div>
					<StarRatings rating={review.rating} />
					<div className='mb-2'>{review.feedback}</div>
					<div>
						{review.instructorResponse ? (
							<ButtonDefault handleClick={handleSeeResponseClick} text={showResponse ? 'HIDE RESPONSE' : 'SEE RESPONSE'} />
						) : (
							<ButtonDefault handleClick={handleRespondClick} text={'RESPOND'} />
						)}
					</div>

					<div className='show-response'>
						{review.instructorResponse && showResponse && <InstructorResponse response={review.instructorResponse} />}
						{showResponseInput && (
							<div className='mt-3 flex'>
								<img
									src={createImageFromInitials(160, instructor.firstName + ' ' + instructor.lastName)}
									alt='avatar'
									className='w-10 h-10 rounded-full mr-2'
								/>

								<div className='w-full'>
									<textarea placeholder='Add a reply...' className='w-full p-2 border rounded mb-2'></textarea>
									<div className='flex flex-row justify-end'>
										<button
											onClick={handleCancelClick}
											className='duration-300 ease-in-out hover:text-purple-600 active:bg-gray-200 p-2 active:text-purple-800 text-purple-600 text-sm font-bold text-start'
										>
											CANCEL
										</button>
										<ButtonDefault handleClick={handleSaveClick} text={showResponse ? 'HIDE RESPONSE' : 'SEE RESPONSE'} />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='flex flex-row justify-end '>
				<img src={review.courseThumbnail} alt='course thumbnail' className='flex-1 w-10 h-auto rounded-lg mr-2 ' />
				<span className='text-sm text-balance inline-block flex-1'>{review.courseName}</span>
			</div>
		</div>
	);
};

export default Review;
