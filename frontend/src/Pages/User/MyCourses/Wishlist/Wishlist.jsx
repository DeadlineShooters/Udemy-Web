import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RenderStars } from '../../../../Components/StarRatings';
import { useWishlist } from '../../../../CartRouterProvider';
import { Button } from "@material-tailwind/react";
import './Wishlist.css';

const Wishlist = () => {
	const { wishlist } = useWishlist();
	const [searchCourses, setSearchCourses] = useState(null);

	const handleSearch = (event) => {
		const searchQuery = event.target.value;
		if (searchQuery !== '') {
			const results = wishlist.filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setSearchCourses(results);
		} else {
			setSearchCourses(wishlist);
		}
	};

	useEffect(() => {
		setSearchCourses(wishlist);
	}, [wishlist]);
	return (
		<div>
			<div className='upper-wishlist'>
				<h1 class='title text-5xl font-bold pt-10 pb-10'>My learning</h1>
				<div className='filter flex items-center'>
					<button class='text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg' style={{ 'border-color': '#151b32' }}>
						<Link to='/home/my-courses/learning'>All courses</Link>
					</button>
					<button className='text-white hover:bg-purple-900 border-b-8 font-bold py-2 rounded text-lg mx-8'>
						<Link to='/home/my-courses/wishlist'>Wishlist</Link>
					</button>
					<button className='text-white hover:bg-purple-900 border-b-8 border-[#151b32] font-bold py-2 rounded text-lg' style={{ 'border-color': '#151b32' }}>
						<Link to='/home/my-courses/archived'>Archived</Link>
					</button>
				</div>
			</div>
			<div className='lower-wishlist cardContainer mx-auto flex flex-col'>
				<div class='items-end lg:w-1/4 md:w-1/3 w-full ml-auto pb-8 px-2'>
					<label for='default-search' class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
						Search
					</label>
					<div class='relative flex items-center'>
						<input
							type='search'
							id='default-search'
							class='block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search my course...'
							required
							onChange={handleSearch}
						/>
					</div>
				</div>

				<div className='justify-center md:justify-start flex flex-wrap my-20'>
					{searchCourses &&
						searchCourses.map((course) => (
							<Link to={`/course/${course._id}`} className='bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2'>
								<img class='object-cover object-center w-full aspect-[16/9]' src={course.thumbNail.secureURL} alt='' />
								<div class='flex flex-col gap-1 pt-1.5'>
									<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
									<p class='text-xs truncate text-gray-500'>
										{course.instructor.firstName} {course.instructor.lastName}
									</p>
									<div class='flex gap-1 items-center'>
										<span class='text-gray-900 font-bold text-sm'>{course.avgRating}</span>
										<div class='flex gap-0.5'>{RenderStars({ rating: course.avgRating })}</div>
										<span class='text-gray-500 font-medium text-xs inline-block align-middle'>({course.totalStudent.toLocaleString()})</span>
									</div>
									<div class='text-gray-500 text-xs align-middle'>
										{course.totalLength} total hours • {course.totalLecture} lectures
									</div>
									<div class='flex items-center space-x-2'>
										<span class='font-bold text-gray-900 '>
											<span class='underline'>đ</span>
											{(course.price * 0.8).toLocaleString()}
										</span>
										<span class='text-gray-500 line-through'>
											<span class='underline'>đ</span>
											{course.price.toLocaleString()}
										</span>
									</div>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
