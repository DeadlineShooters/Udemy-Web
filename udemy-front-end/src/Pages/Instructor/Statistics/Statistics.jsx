import React, { useState } from 'react';
import Sidebar from '../../../Components/Sidebar/sidebar';

const Statistics = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<>
			<Sidebar />
			<div className='flex'>
				<div className='w-16 h-screen'></div>
				<div className='container mx-auto px-12'>
					<div className='flex justify-between mt-4 relative'>
						<h1 className='text-4xl font-bold'>Statistics</h1>
						<div>
							<button
								id='dropdownSearchButton'
								onClick={toggleDropdown}
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								type='button'
							>
								Dropdown search
								<svg className='w-2.5 h-2.5 ms-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
									<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
								</svg>
							</button>
							{isDropdownOpen && (
								<div id='dropdownSearch' className='z-10 absolute top-full mt-2 right-0 bg-white rounded-lg shadow w-full md:w-[32rem] dark:bg-gray-700'>
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
											></input>
										</div>
									</div>
									<ul class='max-h-96 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownSearchButton'>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
										<button class='flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
											<div class='flex-shrink-0'>
												<img class='h-12' src='https://img-c.udemycdn.com/course/240x135/3490000_d298_2.jpg' alt='' />
											</div>
											<div class='w-full ps-3'>
												<div class='text-gray-500 font-bold text-sm dark:text-gray-400 text-left line-clamp-2'>Docker & Kubernetes: The Practical Guide [2024 Edition]</div>
											</div>
										</button>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Statistics;
