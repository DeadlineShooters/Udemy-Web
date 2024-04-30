import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import './Home.css';

const responsive = {
	xl: {
		breakpoint: { max: 3000, min: 1280 },
		items: 5,
		slidesToSlide: 4,
	},
	lg: {
		breakpoint: { max: 1280, min: 960 },
		items: 4,
		slidesToSlide: 3,
	},
	md: {
		breakpoint: { max: 960, min: 720 },
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

const Home = () => {
	const [courses, setCourses] = useState(null);
	const [categories, setCategories] = useState(null);
	const [categoryInd, setCategoryInd] = useState(null);
	const refContainer = useRef();
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		setContainerWidth(refContainer.current.offsetWidth);

		const handleResize = () => {
			setContainerWidth(refContainer.current.offsetWidth);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup function to remove the event listener
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (refContainer.current) {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
		}
	}, [containerWidth]);

	useEffect(() => {
		if (categories) {
			categories.forEach((category) => {
				axios
					.get(`http://localhost:5000/courses/?category=${category.id}`)
					.then((response) => {
						if (response.data.success) {
							setCourses((prevCourses) => ({
								...prevCourses,
								[category.name]: response.data.courses,
							}));
						}
					})
					.catch((error) => {
						console.error('Error:', error);
					});
			});
		}
	}, [categories]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/courses/categories')
			.then((response) => {
				if (response.data.success) {
					setCategories(response.data.categories);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	return (
		<>
			<div
				className='relative'
				onMouseLeave={() => {
					setCategoryInd(null);
				}}
			>
				<ul class='md:flex justify-center shadow-md flex-wrap max-h-12 overflow-hidden hidden'>
					{categories &&
						categories.map((category, ind) => (
							<a
								href={`/courses/${category.id}`}
								className='group relative m-0 py-3 px-4'
								key={category._id}
								onMouseEnter={() => {
									setCategoryInd(ind);
								}}
							>
								{category.name}
								<div
									className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-solid border-transparent border-b-[#2d2f31] ${
										categoryInd != null && categoryInd === ind ? 'block' : 'hidden'
									} `}
								></div>
							</a>
						))}
				</ul>
				<ul
					class='w-full z-9999 absolute bg-[#2d2f31] text-white md:flex justify-center shadow-md flex-wrap max-h-12 overflow-hidden'
					onMouseEnter={() => {
						setCategoryInd(categoryInd);
					}}
				>
					{categoryInd !== null &&
						categories[categoryInd].subCategories.slice(0, 6).map((subCategory) => (
							<a href={`/courses/${categories[categoryInd].id}`} className='m-0 py-3 px-4' key={subCategory.id}>
								{subCategory}
							</a>
						))}
				</ul>
			</div>

			<div className='flex justify-center'>
				<div className='max-w-[1340px] relative pb-12'>
					<img src='https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg' alt='' />
					<div className='absolute left-12 top-6 lg:left-20 lg:top-16 bg-white hidden md:block md:w-80 lg:w-96 xl:w-[26rem] p-6 shadow-md'>
						<h1 className='font-bold text-3xl lg:text-4xl mb-3'>Learning that gets you</h1>
						<span className='text-base lg:text-lg pb-3 block'>Skills for your present (and your future). Get started with us.</span>
					</div>
				</div>
			</div>
			<div ref={refContainer} className='px-8 max-w-[1340px] mx-auto'>
				<span className='font-bold text-3xl text-gray-800 mb-8 block'>What to learn next</span>
				{categories &&
					categories.map((category) =>
						courses && courses[category.name] && courses[category.name].length > 0 ? (
							<div className='mb-12'>
								<span className='font-bold text-2xl text-gray-800 block mb-4'>
									Top courses in{' '}
									<a href={`courses/${category.id}`} className='text-[#5624d0] underline'>
										{category.name}
									</a>
								</span>
								<Carousel containerClass='' itemClass='m-2 itemClassHome' responsive={responsive}>
									{courses[category.name].map((course) => (
										<Link to={`/course/${course._id}`}>
											<div class=''>
												<img class='object-cover object-center h-img-carousel w-full' src={course.thumbNail.secureURL} alt='' />
												<div class='flex flex-col gap-1 pt-1.5'>
													<h3 class='h-10 font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
													<p class='text-xs truncate text-gray-500'>
														{course.instructor.firstName} {course.instructor.lastName}
													</p>
													<div class='flex gap-1 items-center'>
														<span class='text-gray-900 font-bold text-sm'>{course.avgRating}</span>
														<div class='flex gap-0.5'>{RenderStars({ rating: course.avgRating })}</div>
														<span class='text-gray-500 font-medium text-xs inline-block align-middle'>
															({course.totalStudent.toLocaleString()})
														</span>
													</div>
													<div class='text-gray-500 text-xs align-middle'>
														{course.totalLength} total hours • {course.totalLecture} lectures
													</div>
													<div class='flex items-center space-x-2'>
														{course.price === 0 ? (
															<span class='font-bold text-gray-900 '>Free</span>
														) : (
															<>
																<span class='font-bold text-gray-900 '>
																	<span class='underline'>đ</span>
																	{(course.price * 0.8).toLocaleString()}
																</span>
																<span class='text-gray-500 line-through'>
																	<span class='underline'>đ</span>
																	{course.price.toLocaleString()}
																</span>
															</>
														)}
													</div>
												</div>
											</div>
										</Link>
									))}
								</Carousel>
							</div>
						) : null
					)}
			</div>
		</>
	);
};

export default Home;
