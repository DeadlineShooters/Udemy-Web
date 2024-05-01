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
	const [selectedCourse, setSelectedCourse] = useState('');
	const [selectedChart, setSelectedChart] = useState('Revenue');
	const [revenues, setRevenues] = useState([]);
	const [enrollments, setEnrollments] = useState([]);
	const [avgRatings, setAvgRatings] = useState([]);
	const [totalRevenue, setTotalRevenue] = useState([]);
	const [totalEnrollments, setTotalEnrollments] = useState([]);
	const [avgRating, setAvgRating] = useState([]);
	const [courses, setCourses] = useState([]);
	const [searchCourses, setSearchCourses] = useState(null);
	const [series, setSeries] = useState([]);
	const selectedCourseRef = useRef();
	selectedCourseRef.current = selectedCourse;

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleDropdownItemClick = (course) => {
		setSelectedCourse(course);
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

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/stats', {
					userId: userData._id,
					courseId: selectedCourseRef.current ? selectedCourseRef.current._id : '',
				});
				if (response.data.success) {
					setTotalRevenue(response.data.totalRevenue);
					setTotalEnrollments(response.data.totalEnrollments);
					setAvgRating(response.data.avgRating);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		})();
	}, [selectedCourse]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/stats-by-month', {
					userId: userData._id,
					courseId: selectedCourseRef.current ? selectedCourseRef.current._id : '',
				});
				if (response.data.success) {
					console.log(response.data);
					setRevenues(fillData(response.data.revenues));
					setEnrollments(fillData(response.data.enrollments));
					setAvgRatings(fillData(response.data.ratings));
				}
			} catch (error) {
				console.error('Error:', error);
			}
		})();
	}, [selectedCourse]);

	useEffect(
		() => async () => {
			try {
				const response = await axios.post('http://localhost:5000/instructor/get-course', { instructorID: userData._id });
				if (response.data.success) {
					setCourses(response.data.course);
				}
			} catch (error) {
				console.error('Error:', error);
			}
		},
		[]
	);

	useEffect(() => {
		let data;
		switch (selectedChart) {
			case 'Revenue':
				data = revenues;
				break;
			case 'Enrollment':
				data = enrollments;
				break;
			case 'Rating':
				data = avgRatings;
				break;
			default:
				data = [];
		}

		setSeries([
			{
				name: selectedChart,
				data: data,
			},
		]);
	}, [selectedChart, revenues, enrollments, avgRatings]);

	useEffect(() => {
		series.name = selectedChart;
	}, [selectedChart]);

	const handleSearch = (event) => {
		const searchQuery = event.target.value;
		if (searchQuery !== '') {
			const results = courses.filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setSearchCourses(results);
		} else {
			setSearchCourses(courses);
		}
	};

	const getNearestMonths = (count) => {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const currentMonth = new Date().getMonth();
		let months = [];

		for (let i = count - 1; i >= 0; i--) {
			const monthIndex = (currentMonth - i + 12) % 12;
			months.push(monthNames[monthIndex]);
		}

		return months;
	};

	const fillData = (data, count = 12) => {
		const filledData = new Array(count).fill(0);
		const start = count - data.length;
		for (let i = 0; i < data.length; i++) {
			filledData[start + i] = data[i];
		}
		return filledData;
	};

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
			categories: getNearestMonths(12),
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
								className='justify-end w-full md:w-[32rem] text-2xl text-gray-500 hover:text-gray-800  focus:outline-none  font-medium text-xl px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								type='button'
							>
								<span className='truncate'>{selectedCourse !== '' ? selectedCourse.name : 'All courses'}</span>
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
										{courses.map((course) => (
											<button
												class='w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
												onClick={() => handleDropdownItemClick(course)}
											>
												<div class='flex-shrink-0'>
													<img class='object-cover object-center h-12 w-20' src={course.thumbNail.secureURL} alt='' />
												</div>
												<div class='w-full ps-3'>
													<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>{course.name}</div>
												</div>
											</button>
										))}
									</ul>
									<button
										class='font-medium justify-center w-full border-t-2 flex items-center p-2 text-[#2d2f31] hover:text-[#eb524f]'
										onClick={() => handleDropdownItemClick('')}
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
										selectedChart === 'Revenue' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('Revenue');
									}}
								>
									<span className='text-gray-500'>Total revenue</span>
									<span className='text-3xl sm:text-4xl font-medium'>${totalRevenue ? totalRevenue.toLocaleString() : 0}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>${revenues[11] ? revenues[11].toLocaleString() : 0}</span> this month
									</div>
								</button>

								<button
									class={`${
										selectedChart === 'Enrollment' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('Enrollment');
									}}
								>
									<span className='text-gray-500'>Total enrollments</span>
									<span className='text-3xl sm:text-4xl  font-medium'>{totalEnrollments ? totalEnrollments.toLocaleString() : 0}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>{enrollments[11] ? enrollments[11].toLocaleString() : 0}</span> this month
									</div>
								</button>

								<button
									class={`${
										selectedChart === 'Rating' ? 'border-[#a435f0] bg-purple-50' : ''
									} hover:border-[#a435f0] hover:bg-purple-50 flex flex-col justify-center gap-2 border-2 border-dashed border-gray-500/50 px-2 sm:px-4 lg:px-8 rounded-md dark:text-gray-200`}
									onClick={() => {
										handleChartItemClick('Rating');
									}}
								>
									<span className='text-gray-500'>Instructor rating</span>
									<span className='text-3xl sm:text-4xl  font-medium'>{avgRating ? avgRating.toLocaleString() : 0}</span>
									<div className='text-gray-500'>
										<span className='font-medium'>{avgRatings[11] ? avgRatings[11].toLocaleString() : 0}</span> ratings this month
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
