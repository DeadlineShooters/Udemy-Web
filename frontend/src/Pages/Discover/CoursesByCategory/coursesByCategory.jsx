import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './coursesByCategory.css';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { Select, Option, Accordion, AccordionHeader, AccordionBody, Checkbox, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';

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

const CoursesByCategory = () => {
	const [sortBy, setSortBy] = useState('mostPopular');
	const [openFilters, setOpenFilters] = useState(filterFields.map(() => 0));
	const [openFilterBar, setOpenFilterBar] = useState(false);
	const [openFilterBarSm, setOpenFilterBarSm] = useState(false);

	const handleOpenFilters = (ind) => setOpenFilters((prev) => prev.map((value, index) => (index === ind ? !value : value)));
	const toggleDrawer = () => {
		setOpenFilterBarSm((prevState) => !prevState);
	};

	const refContainer = useRef();
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		setContainerWidth(refContainer.current.offsetWidth);

		const handleResize = () => {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
			if (!isMediumScreen) {
				setOpenFilterBarSm(false);
			}
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

	const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });

	return (
		<>
			<div className='flex justify-center'>
				<div ref={refContainer} className='w-full max-w-[1340px] px-8 pt-12'>
					<div className='font-bold text-3xl mb-12'>Category Name Courses</div>
					<div className='font-bold text-2xl'>Popular instructors</div>
					<Carousel containerClass='' itemClass='m-2 itemClassCoursesByCategory' responsive={responsive}>
						{instructors.map((instructor) => (
							<div class='flex border p-4 border-gray-400 gap-4 mt-4'>
								<img className='rounded-full w-16 h-fit' src={instructor.image} alt='' />
								<div className='flex flex-col gap-0.5'>
									<span className='font-bold'>{instructor.name}</span>
									<span className='text-sm line-clamp-2'>{instructor.subCategories.join(', ')}</span>
									<span className='flex gap-1 items-center'>
										<span className='font-bold'>{instructor.rating}</span>
										<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current ' viewBox='0 0 16 16'>
											<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
										</svg>
										<span className='text-xs'>Instructor Rating</span>
									</span>
									<span className='text-xs'>
										<span className='font-bold'>{instructor.students.toLocaleString()}</span> students
									</span>
									<span className='text-xs'>
										<span className='font-bold'>{instructor.courses.toLocaleString()}</span> courses
									</span>
								</div>
							</div>
						))}
					</Carousel>
					<div className='font-bold text-2xl mb-4'>All Data Science courses</div>
					<div className='flex justify-between items-center my-8'>
						<div className='flex gap-3 items-center'>
							<button
								className='gap-2 flex justify-center items-center border rounded-md border-blue-gray-200 p-3'
								onClick={() => {
									setOpenFilterBar(!openFilterBar);
									if (isMediumScreen) {
										toggleDrawer();
									}
								}}
							>
								<svg className='w-6' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										fill-rule='evenodd'
										clip-rule='evenodd'
										d='M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z'
										fill='#000000'
									></path>
								</svg>
								<span className='font-bold'>Filter</span>
							</button>
							<div className=''>
								<Select size='lg' label='Sort by' value={sortBy} onChange={(val) => setSortBy(val)}>
									<Option className='m-0 my-1 w-full' value='mostPopular'>
										Most Popular
									</Option>
									<Option className='m-0 my-1 w-full' value='highestRated'>
										Highest Rated
									</Option>
									<Option className='m-0 my-1 w-full' value='newest'>
										Newest
									</Option>
								</Select>
							</div>
						</div>
						<span className='font-bold text-gray-600 text-md'>3,647 results</span>
					</div>
					<div className='grid grid-cols-12 gap-4'>
						<div className={`hidden ${openFilterBar ? 'lg:block col-span-3' : ''} `}>
							{filterFields.map((field, ind) => (
								<Accordion open={openFilters[ind]} icon={<ArrowIcon open={openFilters[ind]} />}>
									<AccordionHeader onClick={() => handleOpenFilters(ind)}>{field}</AccordionHeader>
									<AccordionBody>
										{filterOptions[ind].map((option) => (
											<List className='p-0'>
												<ListItem className='p-0'>
													<label className='flex w-full cursor-pointer items-center p-2 m-0'>
														<ListItemPrefix className='mr-3'>
															<Checkbox
																ripple={false}
																className='hover:before:opacity-0'
																containerProps={{
																	className: 'p-0',
																}}
															/>
														</ListItemPrefix>
														<Typography color='blue-gray' className='font-medium'>
															<div className={`flex ${ind === 0 ? 'gap-2' : ''}`}>
																<div className='flex gap-0.5'>{ind === 0 && RenderStars({ rating: option })}</div>
																<span className='text-sm'>
																	{option} {ind === 0 && ' & up'}
																</span>
															</div>
														</Typography>
													</label>
												</ListItem>
											</List>
										))}
									</AccordionBody>
								</Accordion>
							))}
						</div>
						<div className={`col-span-full ${openFilterBar ? 'lg:col-span-9' : ''}  divide-y divide-gray-300`}>
							{courses.map((course) => (
								<div className='flex gap-4 pb-8 pt-4 '>
									<img className='w-24 h-24 object-cover object-center md:w-60 md:h-fit' src={course.image} alt='' />
									<div className='pr-24 relative flex flex-col gap-1 w-full '>
										<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
										<span class='text-sm text-gray-700 font-medium'>{course.headline}</span>
										<span class='text-xs text-gray-700'>{course.instructor}</span>
										<div class='flex gap-1 items-center'>
											<span class='text-gray-900 font-bold text-sm'>{course.rating}</span>
											<div class='flex gap-0.5'>{RenderStars({ rating: course.rating })}</div>
											<span class='text-gray-700 font-medium text-xs inline-block align-middle'>({course.ratingCnt.toLocaleString()})</span>
										</div>
										<div class='text-gray-700 text-xs align-middle'>
											{course.hours} total hours • {course.lectures} lectures
										</div>
										<div class='flex flex-col items-end content-end space-x-2 absolute top-0 right-0'>
											<span class='font-bold text-gray-900 '>
												<span class='underline'>đ</span>
												{course.discountedPrice.toLocaleString()}
											</span>
											<span class='text-gray-700 line-through'>
												<span class='underline'>đ</span>
												{course.originalPrice.toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Drawer open={openFilterBarSm} onClose={toggleDrawer} direction='right' className='w-72 z-9999'>
				<div className='relative h-full overflow-y-scroll'>
					<div className='p-4 min-h-screen'>
						{filterFields.map((field, ind) => (
							<Accordion open={openFilters[ind]} icon={<ArrowIcon open={openFilters[ind]} />}>
								<AccordionHeader onClick={() => handleOpenFilters(ind)}>{field}</AccordionHeader>
								<AccordionBody>
									{filterOptions[ind].map((option) => (
										<List className='p-0'>
											<ListItem className='p-0'>
												<label className='flex w-full cursor-pointer items-center p-2 m-0'>
													<ListItemPrefix className='mr-3'>
														<Checkbox
															ripple={false}
															className='hover:before:opacity-0'
															containerProps={{
																className: 'p-0',
															}}
														/>
													</ListItemPrefix>
													<Typography color='blue-gray' className='font-medium'>
														<div className={`flex ${ind === 0 ? 'gap-2' : ''}`}>
															<div className='flex gap-0.5'>{ind === 0 && RenderStars({ rating: option })}</div>
															<span className='text-sm'>
																{option} {ind === 0 && ' & up'}
															</span>
														</div>
													</Typography>
												</label>
											</ListItem>
										</List>
									))}
								</AccordionBody>
							</Accordion>
						))}
					</div>
					<div className='sticky bottom-0 w-full bg-white shadow-[0_-2px_4px_rgba(0,0,0,.08),0_-4px_12px_rgba(0,0,0,.08)] py-4'>
						<button className='bg-gray-900 text-white w-11/12 mx-auto flex justify-center p-2'>Done</button>
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default CoursesByCategory;
