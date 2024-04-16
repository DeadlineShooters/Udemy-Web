import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-multi-carousel';
import Drawer from 'react-modern-drawer';
import axios from 'axios';
import { Select, Option, Accordion, AccordionHeader, AccordionBody, Checkbox, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import 'react-multi-carousel/lib/styles.css';
import 'react-modern-drawer/dist/index.css';

const responsive = {
	xl: {
		breakpoint: { max: 3000, min: 1140 },
		items: 4,
		slidesToSlide: 3,
	},
	md: {
		breakpoint: { max: 1140, min: 720 },
		items: 3,
		slidesToSlide: 2,
	},
	sm: {
		breakpoint: { max: 720, min: 540 },
		items: 2,
		slidesToSlide: 1,
	},
	none: {
		breakpoint: { max: 540, min: 0 },
		items: 1,
		slidesToSlide: 1,
	},
};

const instructors = [
	{
		name: 'John Doe',
		image: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c_3.jpg',
		subCategories: ['Web Development', 'Data Science'],
		rating: 4.5,
		students: 1164668,
		courses: 8,
	},
	{
		name: 'John Doe',
		image: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c_3.jpg',
		subCategories: ['Web Development', 'Data Science'],
		rating: 4.5,
		students: 1164668,
		courses: 8,
	},
	{
		name: 'John Doe',
		image: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c_3.jpg',
		subCategories: ['Web Development', 'Data Science'],
		rating: 4.5,
		students: 1164668,
		courses: 8,
	},
	{
		name: 'John Doe',
		image: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c_3.jpg',
		subCategories: ['Web Development', 'Data Science'],
		rating: 4.5,
		students: 1164668,
		courses: 8,
	},
	{
		name: 'John Doe',
		image: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c_3.jpg',
		subCategories: ['Web Development', 'Data Science'],
		rating: 4.5,
		students: 1164668,
		courses: 8,
	},
];

const courses = [
	{
		name: 'Docker & Kubernetes: The Practical Guide [2024 Edition]',
		headline: 'Learn Docker, Docker Compose, Multi-Container Projects, Deployment and all about Kubernetes from the ground up!',
		instructor: 'Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller',
		rating: 4.7,
		ratingCnt: 25485,
		hours: 23.5,
		lectures: 262,
		discountedPrice: 349000,
		originalPrice: 2199000,
		image: 'https://img-b.udemycdn.com/course/240x135/3490000_d298_2.jpg',
	},
	{
		name: 'Docker & Kubernetes: The Practical Guide [2024 Edition]',
		headline: 'Learn Docker, Docker Compose, Multi-Container Projects, Deployment and all about Kubernetes from the ground up!',
		instructor: 'Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller',
		rating: 4.7,
		ratingCnt: 25485,
		hours: 23.5,
		lectures: 262,
		discountedPrice: 349000,
		originalPrice: 2199000,
		image: 'https://img-b.udemycdn.com/course/240x135/3490000_d298_2.jpg',
	},
];

const filterFields = ['Ratings', 'Languages', 'Video Duration', 'Features', 'Price'];

const filterOptions = [
	[4.5, 4.0, 3.5, 3.0],
	['English', 'Vietnamese'],
	['0-3 hours', '3-6 hours', '6-9 hours', '9-12 hours'],
	['Subtitles', 'Quizzes', 'Coding Exercises', 'Practice Tests'],
	['Free', 'Paid'],
];

function ArrowIcon({ id, open }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='currentColor'
			className={`${open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
		</svg>
	);
}

function FullStarIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current ' viewBox='0 0 16 16'>
			<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
		</svg>
	);
}

function HalfStarIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
			<path d='M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z' />
		</svg>
	);
}

function StarIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
			<path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
		</svg>
	);
}

function RenderStars({ rating }) {
	const stars = [];
	for (let i = 0; i < 5; i++) {
		if (i < rating - 0.7) {
			stars.push(<FullStarIcon key={i} />);
		} else if (i < rating) {
			stars.push(<HalfStarIcon key={i} />);
		} else {
			stars.push(<StarIcon key={i} />);
		}
	}
	return stars;
}

const Cart = () => {
	const refContainer = useRef();
	const [containerWidth, setContainerWidth] = useState(0);
	const [amount, setAmount] = useState(0);
	const [cartedCourses, setCartedCourses] = useState([]);
	const [savedCourses, setSavedCourses] = useState([]);
	const [wishlistedCourses, setWishlistedCourses] = useState([]);

	useEffect(() => {
		setContainerWidth(refContainer.current.offsetWidth);

		const handleResize = () => {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		console.log(containerWidth);
		if (refContainer.current) {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
		}
	}, [containerWidth]);

	useEffect(() => async () => {
		const userId = localStorage.getItem('user')._id;
		try {
			const response = await axios.post('http://localhost:5000/user', { userId });
			if (response.data.success) {
				
				setCartedCourses(response.data.cartedCourses);
				setSavedCourses(response.data.savedCourses);
				setWishlistedCourses(response.data.wishlistedCourses);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}, [])

	const handlePayment = async () => {
		const userId = localStorage.getItem('user')._id;
		try {
			const response = await axios.post('http://localhost:5000/payment', {
				userId,
				amount: 100000,
			});
			if (response.data.success) {
				window.location.href = response.data.payUrl;
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<>
			<div className='flex justify-center'>
				<div ref={refContainer} className='w-full max-w-[1340px] px-12 pt-12'>
					<div className='font-bold text-4xl mb-4'>Shopping Cart</div>
					<div className='flex flex-col-reverse md:flex-row'>
						<div className='grow'>
							{courses.length > 0 ? (
								<div className='w-full'>
									<div className='font-bold mb-2 mt-8'>
										{courses.length} {courses.length === 1 ? 'Course' : 'Courses'} in Cart
									</div>
									<ul className='divide-y divide-gray-300 border-t border-gray-300'>
										{courses.map((course) => (
											<div className='py-4 grid lg:grid-cols-[8rem_auto_auto_auto] grid-cols-[5rem_auto_auto_auto]'>
												<img className='w-16 h-16 object-cover object-center lg:w-28 lg:h-fit' src={course.image} alt='' />
												<div className='flex gap-4'>
													<div className='relative flex flex-col gap-1 '>
														<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
														<span class='text-xs text-gray-700'>{course.instructor}</span>
														<div class='flex gap-1 items-center'>
															<span class='text-gray-900 font-bold text-sm'>{course.rating}</span>
															<div class='flex gap-0.5'>{RenderStars({ rating: course.rating })}</div>
															<span class='text-gray-700 font-medium text-xs inline-block align-middle'>
																({course.ratingCnt.toLocaleString()})
															</span>
														</div>
														<div class='text-gray-700 text-xs align-middle'>
															{course.hours} total hours • {course.lectures} lectures
														</div>
													</div>
												</div>

												<div className='mt-2 xl:mt-0 row-start-2 col-start-2 col-span-full xl:col-span-1 xl:col-start-auto xl:row-auto flex xl:flex-col items-end text-sm gap-4 xl:gap-1 text-[#5624d0]'>
													<span>Remove</span>
													<span>Save for Later</span>
													<span>Move to Wishlist</span>
												</div>

												<div class='flex flex-col pl-12'>
													<span class='font-bold text-[#a435f0] flex items-center'>
														<span class='underline'>đ</span>
														<span>{course.discountedPrice.toLocaleString()}</span>
														<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1 self-end'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z'
																fill='#a435f0'
															></path>
														</svg>
													</span>
													<span class='text-gray-700 line-through'>
														<span class='underline'>đ</span>
														{course.originalPrice.toLocaleString()}
													</span>
												</div>
											</div>
										))}
									</ul>
								</div>
							) : null}
							{courses.length > 0 ? (
								<div className='w-full'>
									<div className='font-bold mb-2 mt-8'>Saved for Later</div>
									<ul className='divide-y divide-gray-300 border-t border-gray-300'>
										{courses.map((course) => (
											<div className='py-4 grid lg:grid-cols-[8rem_auto_auto_auto] grid-cols-[5rem_auto_auto_auto]'>
												<img className='w-16 h-16 object-cover object-center lg:w-28 lg:h-fit' src={course.image} alt='' />
												<div className='flex gap-4'>
													<div className='relative flex flex-col gap-1 '>
														<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
														<span class='text-xs text-gray-700'>{course.instructor}</span>
														<div class='flex gap-1 items-center'>
															<span class='text-gray-900 font-bold text-sm'>{course.rating}</span>
															<div class='flex gap-0.5'>{RenderStars({ rating: course.rating })}</div>
															<span class='text-gray-700 font-medium text-xs inline-block align-middle'>
																({course.ratingCnt.toLocaleString()})
															</span>
														</div>
														<div class='text-gray-700 text-xs align-middle'>
															{course.hours} total hours • {course.lectures} lectures
														</div>
													</div>
												</div>

												<div className='mt-2 xl:mt-0 row-start-2 col-start-2 col-span-full xl:col-span-1 xl:col-start-auto xl:row-auto flex xl:flex-col items-end text-sm gap-4 xl:gap-1 text-[#5624d0]'>
													<span>Remove</span>
													<span>Move to Cart</span>
												</div>

												<div class='flex flex-col pl-12'>
													<span class='font-bold text-[#a435f0] flex items-center'>
														<span class='underline'>đ</span>
														<span>{course.discountedPrice.toLocaleString()}</span>
														<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1 self-end'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z'
																fill='#a435f0'
															></path>
														</svg>
													</span>
													<span class='text-gray-700 line-through'>
														<span class='underline'>đ</span>
														{course.originalPrice.toLocaleString()}
													</span>
												</div>
											</div>
										))}
									</ul>
								</div>
							) : null}
							{courses.length > 0 ? (
								<div className='w-full'>
									<div className='font-bold mb-2 mt-8'>Recently wishlisted</div>
									<ul className='divide-y divide-gray-300 border-t border-gray-300'>
										{courses.map((course) => (
											<div className='py-4 grid lg:grid-cols-[8rem_auto_auto_auto] grid-cols-[5rem_auto_auto_auto]'>
												<img className='w-16 h-16 object-cover object-center lg:w-28 lg:h-fit' src={course.image} alt='' />
												<div className='flex gap-4'>
													<div className='relative flex flex-col gap-1 '>
														<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
														<span class='text-xs text-gray-700'>{course.instructor}</span>
														<div class='flex gap-1 items-center'>
															<span class='text-gray-900 font-bold text-sm'>{course.rating}</span>
															<div class='flex gap-0.5'>{RenderStars({ rating: course.rating })}</div>
															<span class='text-gray-700 font-medium text-xs inline-block align-middle'>
																({course.ratingCnt.toLocaleString()})
															</span>
														</div>
														<div class='text-gray-700 text-xs align-middle'>
															{course.hours} total hours • {course.lectures} lectures
														</div>
													</div>
												</div>

												<div className='mt-2 xl:mt-0 row-start-2 col-start-2 col-span-full xl:col-span-1 xl:col-start-auto xl:row-auto flex xl:flex-col items-end text-sm gap-4 xl:gap-1 text-[#5624d0]'>
													<span>Remove</span>
													<span>Move to Cart</span>
												</div>

												<div class='flex flex-col pl-12'>
													<span class='font-bold text-[#a435f0] flex items-center'>
														<span class='underline'>đ</span>
														<span>{course.discountedPrice.toLocaleString()}</span>
														<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1 self-end'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z'
																fill='#a435f0'
															></path>
														</svg>
													</span>
													<span class='text-gray-700 line-through'>
														<span class='underline'>đ</span>
														{course.originalPrice.toLocaleString()}
													</span>
												</div>
											</div>
										))}
									</ul>
								</div>
							) : null}
						</div>
						<div className='flex flex-col grow min-w-72 xl:ml-12 lg:ml-8 md:ml-4 gap-0.5'>
							<span className='font-bold text-gray-600 mb-2'>Total: </span>
							<span class='font-bold text-gray-900 text-4xl'>
								<span class='underline'>đ</span>
								{courses.reduce((acc, course) => acc + course.discountedPrice, 0).toLocaleString()}
							</span>
							<span class='text-gray-700 line-through'>
								<span class='underline'>đ</span>
								{courses.reduce((acc, course) => acc + course.originalPrice, 0).toLocaleString()}
							</span>
							<span className='mb-2.5 text-gray-900'>
								{Math.round(
									(courses.reduce((acc, course) => acc + course.discountedPrice, 0) / courses.reduce((acc, course) => acc + course.originalPrice, 0)) *
										100
								)}
								% off
							</span>
							<button className='w-full bg-[#a435f0] text-white p-3 font-bold mb-4'>Checkout</button>
							<div className='w-full border-t border-gray-300 py-2 font-bold text-gray-800'>Promotions</div>
							<form action='' className='flex text-sm items-center'>
								<input className='border border-gray-700 px-4 py-2 w-full box-border outline-none' placeholder='Enter Coupon' />
								<button className='bg-[#a435f0] text-white px-4 py-2 border border-[#a435f0] font-bold'>Apply</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
