import React, { useState, useRef, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Home.css';

const responsive = {
	xl: {
		breakpoint: { max: 3000, min: 1140 },
		items: 5,
		slidesToSlide: 4,
	},
	lg: {
		breakpoint: { max: 1140, min: 960 },
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

const categories = [
	'Development',
	'Business',
	'Finance & Accounting',
	'IT & Software',
	'Office Productivity',
	'Personal Development',
	'Design',
	'Marketing',
	'Health & Fitness',
	'Music',
];

const subCategories = [
	[
		'Web Development',
		'Data Science',
		'Mobile Development',
		'Programming Languages',
		'Game Development',
		'Database Design & Development',
		'Software Testing',
		'Software Engineering',
		'Software Development Tools',
		'No-Code Development',
	],
	[
		'Entrepreneurship',
		'Communication',
		'Management',
		'Sales',
		'Business Strategy',
		'Operations',
		'Project Management',
		'Business Law',
		'Business Analytics & Intelligence',
		'Human Resources',
		'Industry',
		'E-Commerce',
		'Media',
		'Real Estate',
		'Other Business',
	],
	[
		'Accounting & Bookkeeping',
		'Compliance',
		'Cryptocurrency & Blockchain',
		'Economics',
		'Finance',
		'Finance Cert & Exam Prep',
		'Financial Modeling & Analysis',
		'Investing & Trading',
		'Money Management Tools',
		'Taxes',
		'Other Finance & Accounting',
	],
	['IT certifications', 'Network & Security', 'Hardware', 'Operating Systems & Servers', 'Other IT & Software'],
	['Microsoft', 'Apple', 'Google', 'SAP', 'Oracle', 'Other Office Productivity'],
	[
		'Personal Transformation',
		'Productivity',
		'Leadership',
		'Personal Finance',
		'Career Development',
		'Parenting & Relationships',
		'Happiness',
		'Religion & Spirituality',
		'Personal Brand Building',
		'Creativity',
		'Influence',
		'Self Esteem',
		'Stress Management',
		'Memory & Study Skills',
		'Motivation',
		'Other Personal Development',
	],
	[
		'Web Design',
		'Graphic Design & Illustration',
		'Design Tools',
		'User Experience',
		'Game Design',
		'Design Thinking',
		'3D & Animation',
		'Fashion',
		'Architectural Design',
		'Interior Design',
		'Other Design',
	],
	[
		'Digital Marketing',
		'Search Engine Optimization',
		'Social Media Marketing',
		'Branding',
		'Marketing Fundamentals',
		'Analytics & Automation',
		'Public Relations',
		'Advertising',
		'Video & Mobile Marketing',
		'Content Marketing',
		'Growth Hacking',
		'Affiliate Marketing',
		'Product Marketing',
		'Other Marketing',
	],
	[
		'Fitness',
		'General Health',
		'Sports',
		'Nutrition',
		'Yoga',
		'Mental Health',
		'Dieting',
		'Self Defense',
		'Safety & First Aid',
		'Dance',
		'Meditation',
		'Other Health & Fitness',
	],
	['Instruments', 'Production', 'Music Fundamentals', 'Vocal', 'Music Techniques', 'Music Software', 'Other Music'],
	[
		'Engineering',
		'Humanities',
		'Math',
		'Science',
		'Online Education',
		'Social Science',
		'Language Learning',
		'Teacher Training',
		'Test Prep',
		'Other Teaching & Academics',
	],
];

const Home = () => {
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
		console.log(containerWidth);
		if (refContainer.current) {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
		}
	}, [containerWidth]);

	return (
		<>
			<div
				className='relative'
				onMouseLeave={() => {
					setCategoryInd(null);
				}}
			>
				<ul class='md:flex justify-center shadow-md flex-wrap max-h-12 overflow-hidden hidden'>
					{categories.map((category, ind) => (
						<a
							href='/courses/category-name'
							className='group relative m-0 py-3 px-4'
							key={category.id}
							onMouseEnter={() => {
								setCategoryInd(ind);
							}}
						>
							{category}
							<div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-solid border-transparent border-b-[#2d2f31] ${categoryInd != null && categoryInd === ind ? 'block' : 'hidden'} `}></div>
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
						subCategories[categoryInd].slice(0, 6).map((subCategory) => (
							<a href='/courses/category-name' className='m-0 py-3 px-4' key={subCategory.id}>
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
				{categories.map((category) => (
					<div className='mb-12'>
						<span className='font-bold text-2xl text-gray-800 block mb-4'>
							Top courses in <a href='courses/category-name' className='text-[#5624d0] underline'>{category}</a>
						</span>
						<Carousel containerClass='' itemClass='m-2 itemClassHome' responsive={responsive}>
							{categories.map((category) => (
								<div class=''>
									<a href='/course/:courseId'><img class='' src='https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg' alt='' /></a>
									<div class='flex flex-col gap-1 pt-1.5'>
										<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
										<p class='text-xs truncate text-gray-500'>Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
										<div class='flex gap-1 items-center'>
											<span class='text-gray-900 font-bold text-sm'>4.7</span>

											<div class='flex gap-0.5'>
												<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current ' viewBox='0 0 16 16'>
													<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
												</svg>
												<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
													<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
												</svg>
												<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
													<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
												</svg>
												<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
													<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
												</svg>
												<svg xmlns='http://www.w3.org/2000/svg' class='text-[#b4690e] w-3 h-auto fill-current' viewBox='0 0 16 16'>
													<path d='M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z' />
												</svg>
											</div>

											<span class='text-gray-500 font-medium text-xs inline-block align-middle'>({(25359).toLocaleString()})</span>
										</div>
										<div class='text-gray-500 text-xs align-middle'>23.5 total hours • 262 lectures</div>
										<div class='flex items-center space-x-2'>
											<span class='font-bold text-gray-900 '>
												<span class='underline'>đ</span>
												{(349000).toLocaleString()}
											</span>
											<span class='text-gray-500 line-through'>
												<span class='underline'>đ</span>
												{(2199000).toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</Carousel>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
