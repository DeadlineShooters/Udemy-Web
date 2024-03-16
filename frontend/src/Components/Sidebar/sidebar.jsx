import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef(null);
	const [selectedItem, setSelectedItem] = useState(location.pathname.split('/')[2]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const toggleSidebar = (event) => {
		event.stopPropagation();
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const [isExpanded, setIsExpanded] = useState(false);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
		setIsExpanded(false);
	};

	return (
		<>
			<button
				onClick={(event) => toggleSidebar(event)}
				aria-controls='logo-sidebar'
				type='button'
				className='inline-flex items-center p-2 mt-2 ms-8 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
			>
				<span className='sr-only'>Toggle sidebar</span>
				<svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					></path>
				</svg>
			</button>

			<div
				ref={sidebarRef}
				className={`fixed top-0 left-0 z-40 h-screen bg-[#2d2f31] transition-all duration-300 overflow-hidden ${isExpanded || isOpen ? 'w-72' : 'w-0 md:w-16'}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div class='h-full overflow-hidden bg-[#2d2f31]'>
					<div class='hover:bg-[#3e4143] py-3'>
						<button class='flex items-center text-gray-900 rounded-lg text-white group' onClick={() => handleItemClick('courses')}>
							<img src='https://svff.info/wp-content/uploads/2018/12/udemy-1-logo-png-transparent.png' class='w-16 p-3' alt='Flowbite Logo' />
							<span
								className={`self-center text-2xl font-semibold whitespace-nowrap  ms-2 text-[#715c52] ${
									isExpanded || isOpen ? 'fadeIn' : 'fadeOut'
								}`}
							>
								Udemy
							</span>
						</button>
					</div>
					<ul class='space-y-2 font-medium'>
						<li className={`sidebar-item relative hover:bg-[#3e4143] w-full m-0 py-2 px-3 ${selectedItem === 'courses' ? 'selected' : ''}`}>
							<a href='/instructor/courses' className='flex items-center p-2 text-gray-900 rounded-lg text-white w-full' onClick={() => handleItemClick('courses')}>
								<svg
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									{' '}
									<path
										d='M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7'
										stroke='#ffffff'
										stroke-width='1.5'
									></path>{' '}
									<path
										d='M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5'
										stroke='#ffffff'
										stroke-width='1.5'
									></path>{' '}
									<path
										d='M14.5812 13.6159C15.1396 13.9621 15.1396 14.8582 14.5812 15.2044L11.2096 17.2945C10.6669 17.6309 10 17.1931 10 16.5003L10 12.32C10 11.6273 10.6669 11.1894 11.2096 11.5258L14.5812 13.6159Z'
										stroke='#ffffff'
										stroke-width='1.5'
									></path>{' '}
									<path
										d='M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z'
										stroke='#ffffff'
										stroke-width='1.5'
									></path>{' '}
								</svg>
								<span className={`ms-8 ${isExpanded || isOpen ? 'fadeIn' : 'fadeOut'}`}>Courses</span>
							</a>
						</li>
						<li className={`sidebar-item relative hover:bg-[#3e4143] w-full m-0 py-2 px-3 ${selectedItem === 'statistics' ? 'selected' : ''}`}>
							<a href='/instructor/statistics' class='flex items-center p-2 text-gray-900 rounded-lg text-white w-full group' onClick={() => handleItemClick('statistics')}>
								<svg
									class='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
								>
									<path
										d='M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M6 15L10 11L14 15L20 9M20 9V13M20 9H16'
										stroke='#ffffff'
										stroke-width='2'
										stroke-linecap='round'
										stroke-linejoin='round'
									></path>
								</svg>
								<span className={`ms-8 ${isExpanded || isOpen ? 'fadeIn' : 'fadeOut'}`}>Statistics</span>
							</a>
						</li>
						<li className={`sidebar-item relative hover:bg-[#3e4143] w-full m-0 py-2 px-3 ${selectedItem === 'qa' ? 'selected' : ''}`}>
							<a href='/instructor/qa' className='flex items-center p-2 text-gray-900 rounded-lg text-white w-full ' onClick={() => handleItemClick('qa')}>
								<svg
									class='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 text-white '
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 640 512'
								>
									<path d='M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z' />
								</svg>
								<span className={`ms-8 ${isExpanded || isOpen ? 'fadeIn' : 'fadeOut'}`}>Q&A</span>
							</a>
						</li>
						<li className={`sidebar-item relative hover:bg-[#3e4143] w-full m-0 py-2 px-3 ${selectedItem === 'feedback' ? 'selected' : ''}`}>
							<a href='/instructor/feedback' className='flex items-center p-2 text-gray-900 rounded-lg text-white w-full' onClick={() => handleItemClick('feedback')}>
								<svg
									class='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 text-white dark:text-gray-400 '
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 32 32'
								>
									<path d='M 16 3 C 15.375 3 14.753906 3.210938 14.21875 3.59375 L 12.5625 4.75 L 10.65625 5 L 10.625 5 L 10.59375 5.03125 C 9.320313 5.316406 8.316406 6.320313 8.03125 7.59375 L 8 7.625 L 8 7.65625 L 7.75 9.59375 L 6.59375 11.09375 L 6.5625 11.125 L 6.5625 11.15625 C 5.863281 12.273438 5.832031 13.714844 6.59375 14.78125 L 7.78125 16.4375 L 8.09375 18.15625 L 4.875 23.0625 L 3.84375 24.59375 L 8.625 24.59375 L 9.78125 27.28125 L 10.5 29 L 11.53125 27.4375 L 14.6875 22.6875 C 15.535156 23.035156 16.492188 23.066406 17.3125 22.6875 L 20.46875 27.4375 L 21.5 29 L 22.21875 27.28125 L 23.375 24.59375 L 28.15625 24.59375 L 27.125 23.0625 L 24 18.3125 L 24.25 16.4375 L 25.40625 14.78125 L 25.4375 14.75 L 25.4375 14.71875 C 26.136719 13.601563 26.167969 12.191406 25.40625 11.125 L 24.25 9.46875 L 23.875 7.59375 L 23.90625 7.59375 C 23.902344 7.570313 23.878906 7.554688 23.875 7.53125 C 23.695313 6.222656 22.660156 5.160156 21.34375 5 L 21.3125 5 L 19.4375 4.75 L 17.78125 3.59375 C 17.246094 3.210938 16.625 3 16 3 Z M 16 5.03125 C 16.230469 5.03125 16.457031 5.101563 16.625 5.21875 L 18.40625 6.5 L 18.625 6.65625 L 18.875 6.6875 L 21.0625 7 L 21.09375 7 C 21.542969 7.050781 21.855469 7.363281 21.90625 7.8125 L 21.90625 7.875 L 22.3125 10.09375 L 22.34375 10.3125 L 22.5 10.5 L 23.78125 12.28125 C 24.019531 12.613281 24.050781 13.175781 23.75 13.65625 L 22.34375 15.625 L 22.3125 15.875 L 22 18.0625 L 22 18.09375 C 21.980469 18.257813 21.925781 18.410156 21.84375 18.53125 L 21.78125 18.5625 L 21.78125 18.59375 C 21.636719 18.765625 21.4375 18.878906 21.1875 18.90625 L 21.125 18.90625 L 18.84375 19.3125 L 18.59375 19.34375 L 18.40625 19.5 L 16.625 20.78125 C 16.292969 21.019531 15.699219 21.050781 15.21875 20.75 L 13.59375 19.5 L 13.40625 19.34375 L 13.125 19.3125 L 10.9375 19 L 10.90625 19 C 10.597656 18.964844 10.359375 18.804688 10.21875 18.5625 C 10.15625 18.453125 10.109375 18.324219 10.09375 18.1875 L 10.09375 18.125 L 9.6875 15.84375 L 9.65625 15.59375 L 9.5 15.40625 L 8.21875 13.625 C 7.980469 13.292969 7.949219 12.699219 8.25 12.21875 L 9.5 10.59375 L 9.65625 10.40625 L 9.6875 10.125 L 9.96875 8.03125 C 9.972656 8.015625 9.996094 8.015625 10 8 C 10.125 7.511719 10.511719 7.125 11 7 C 11.015625 6.996094 11.015625 6.972656 11.03125 6.96875 L 13.125 6.6875 L 13.375 6.65625 L 13.59375 6.5 L 15.375 5.21875 C 15.542969 5.101563 15.769531 5.03125 16 5.03125 Z M 22.90625 20.25 L 24.4375 22.59375 L 22.03125 22.59375 L 21.78125 23.21875 L 21.09375 24.8125 L 18.96875 21.5625 L 19.4375 21.21875 L 21.40625 20.875 L 21.40625 20.90625 C 21.429688 20.902344 21.445313 20.878906 21.46875 20.875 C 22.007813 20.800781 22.496094 20.574219 22.90625 20.25 Z M 9.09375 20.28125 C 9.519531 20.664063 10.0625 20.929688 10.65625 21 C 10.667969 21 10.675781 21 10.6875 21 L 12.59375 21.25 L 13.03125 21.59375 L 10.90625 24.8125 L 10.21875 23.21875 L 9.96875 22.59375 L 7.5625 22.59375 Z'></path>
								</svg>
								<span className={`ms-8 ${isExpanded || isOpen ? 'fadeIn' : 'fadeOut'}`}>Feedback</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
