import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../../Components/Sidebar/sidebar';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useAuth } from '../../../AuthContextProvider';

const Statistics = () => {
	const courseName = 'Docker & Kubernetes: The Practical Guide [2024 Edition]';
	const dropdownRef = useRef(null);
	const { userData } = useAuth();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState('All courses');
	const [selectedChart, setSelectedChart] = useState('revenue');
	const [revenues, setRevenues] = useState([]);
	const [enrollments, setEnrollments] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [totalRevenue, setTotalRevenue] = useState([]);
	const [totalEnrollments, setTotalEnrollments] = useState([]);
	const [avgRating, setAvgRating] = useState([]);
	const [courses, setCourses] = useState([]);
	const [searchCourses, setSearchCourses] = useState(null);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleDropdownItemClick = (courseName) => {
		setSelectedCourse(courseName);
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleChartItemClick = (chartName) => {
		setSelectedChart(chartName);
	};

	useEffect(() => {
		const handleClickOutDropdown = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutDropdown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutDropdown);
		};
	}, []);

	useEffect(
		() => async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/stats', {
					userId: userData._id,
					courseId: selectedCourse.id,
				});
				if (response.data.success) {
					setTotalRevenue(response.data.totalRevenue);
					setTotalEnrollments(response.data.totalEnrollments);
					setAvgRating(response.data.avgRating);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		},
		[]
	);

	useEffect(
		() => async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/stats-by-month', {
					userId: userData._id,
					courseId: selectedCourse.id,
				});
				if (response.data.success) {
					setRevenues(response.data.revenues);
					setEnrollments(response.data.enrollments);
					setRatings(response.data.ratings);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		},
		[]
	);

	useEffect(
		() => async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/courses', { userId: userData._id });
				if (response.data.success) {
					setCourses(response.data.courses);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		},
		[]
	);

	const handleSearch = (event) => {
		const searchQuery = event.target.value;
		if (searchQuery !== '') {
			const results = courses.filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setSearchCourses(results);
		} else {
			setSearchCourses(courses);
		}
	};

	const series = [
		{
			name: 'Sales',
			data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
		},
	];

	const options = {
		chart: {
			type: 'line',
			height: 240,
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#020617'],
		stroke: {
			lineCap: 'round',
			curve: 'smooth',
		},
		markers: {
			size: 0,
		},
		xaxis: {
			axisTicks: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
			labels: {
				style: {
					colors: '#616161',
					fontSize: '12px',
					fontFamily: 'inherit',
					fontWeight: 400,
				},
			},
			categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		yaxis: {
			labels: {
				style: {
					colors: '#616161',
					fontSize: '12px',
					fontFamily: 'inherit',
					fontWeight: 400,
				},
			},
		},
		grid: {
			show: true,
			borderColor: '#dddddd',
			strokeDashArray: 5,
			xaxis: {
				lines: {
					show: true,
				},
			},
			padding: {
				top: 5,
				right: 20,
			},
		},
		fill: {
			opacity: 0.8,
		},
		tooltip: {
			theme: 'dark',
		},
	};

	return (
		<>
			{/* <Sidebar /> */}
			<div className='flex'>
				<div className='md:w-16 h-screen'></div>
				<div className='container mx-auto p-6 py-12 lg:px-12'>
					<div className='flex justify-between mt-4 mb-8 relative items-center'>
						<h1 className='text-4xl font-bold text-gray-900 '>Statistics</h1>
						<div ref={dropdownRef}>
							<button
								id='dropdownSearchButton'
								onClick={toggleDropdown}
								className='justify-end w-full md:w-[32rem] text-2xl text-gray-500 hover:text-gray-700  focus:outline-none  font-medium text-xl px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								type='button'
							>
								<span className='truncate'>{selectedCourse}</span>
								<svg className='w-2.5 h-2.5 ms-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
									<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
								</svg>
							</button>
							{isDropdownOpen && (
								<div
									id='dropdownSearch'
									className='z-9999 absolute top-full mt-2 right-0 bg-white rounded-lg shadow w-full md:w-[32rem] dark:bg-gray-700'
								>
									{/* Dropdown content */}
									<div className='p-3 '>
										<label htmlFor='input-group-search' className='sr-only'>
											Search
										</label>
										<div className='relative'>
											{/* Input field */}
											<div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
												{/* Search icon */}
												<svg
													className='w-4 h-4 text-gray-500 dark:text-gray-400'
													aria-hidden='true'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 20 20'
												>
													<path
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
													/>
												</svg>
											</div>
											{/* Input field */}
											<input
												type='text'
												id='input-group-search'
												className='outline-none block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='Search course'
												onChange={handleSearch}
											></input>
										</div>
									</div>
									<ul class='max-h-96 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownSearchButton'>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
										<button
											class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
											onClick={() => handleDropdownItemClick(courseName)}
										>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{courseName}</div>
											</div>
										</button>
									</ul>
									<button
										class='font-medium justify-center w-full border-t-2 flex items-center p-2 text-[#2d2f31] hover:text-[#eb524f]'
										onClick={() => handleDropdownItemClick('All courses')}
									>
										All courses
									</button>
								</div>
							)}
						</div>
					</div>
					<span className='text-2xl text-gray-500 mb-8 block'>Get top insights about your performance</span>
					<div className='cardContainer relative flex flex-col rounded-xl bg-white text-gray-800 shadow'>
						<div class='dark:bg-gray-800 flex justify-center'>
							<div class='grid grid-cols-2 md:grid-cols-3 gap-6 p-4'>
								<button
									class={`${
										selectedChart === 'revenue' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('revenue');
									}}
								>
									<span className='text-gray-500'>Total revenue</span>
									<span className='text-3xl sm:text-4xl font-medium'>${(42325.28).toLocaleString()}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>${(711.88).toLocaleString()}</span> this month
									</div>
								</button>

								<button
									class={`${
										selectedChart === 'enrollment' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('enrollment');
									}}
								>
									<span className='text-gray-500'>Total enrollments</span>
									<span className='text-3xl sm:text-4xl  font-medium'>{(119023).toLocaleString()}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>{(200).toLocaleString()}</span> this month
									</div>
								</button>

								<button
									class={`${
										selectedChart === 'rating' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('rating');
									}}
								>
									<span className='text-gray-500'>Instructor rating</span>
									<span className='text-3xl sm:text-4xl  font-medium'>{(4.53).toLocaleString()}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>{(68).toLocaleString()}</span> ratings this month
									</div>
								</button>
							</div>
						</div>
						<div className='p-4'>
							<Chart options={options} series={series} type='line' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Statistics;
