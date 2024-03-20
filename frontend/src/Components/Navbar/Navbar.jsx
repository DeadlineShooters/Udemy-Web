import React, { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/Udemy_logo.png';
import heart from '../../Assets/heart.png';
import cart from '../../Assets/cart.png';
import { getColor, createImageFromInitials } from '../Utils/Utils.js';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Menu as MenuMT, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';

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

const Navbar = () => {
	let username = 'Nguyen Minh Thong'; //Handle retrieve user data later
	const [isLogged, setLoggout] = useState(true); //Handle log in later
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	const logout = () => {
		setLoggout(!isLogged);
	};

	const [openMenus, setOpenMenus] = useState(new Array(categories.length).fill(false));

	const [openMenu, setOpenMenu] = useState(false);
	return (
		<div className='header'>
			<div className='navbar'>
				<div class='flex items-center'>
					<Link to='/'>
						<img src={logo} alt='' class='logo'></img>
					</Link>
					<ul class='mx-5 relative'>
						<MenuMT allowHover>
							<MenuHandler>
								<span className='cursor-pointer'>Categories</span>
							</MenuHandler>
							<MenuList className='min-h-[40rem] w-64 top-16'>
								{categories.map((category, ind) => (
									<MenuMT placement='right-start' allowHover offset={12}>
										<MenuHandler className='flex items-center justify-between'>
											<MenuItem>
												<div className='text-gray-900 hover:text-[#5624d0] w-full py-1'>{category}</div>
												<ChevronRightIcon strokeWidth={2.5} className={`h-3.5 w-3.5 `} />
											</MenuItem>
										</MenuHandler>
										<MenuList className='min-h-[40rem] w-64 top-16'>
											{subCategories[ind].map((subCategory) => (
												<MenuItem><div className='text-gray-900 hover:text-[#5624d0] w-full py-1'>{subCategory}</div></MenuItem>
											))}
										</MenuList>
									</MenuMT>
								))}
							</MenuList>
						</MenuMT>
					</ul>
					<form>
						<label for='default-search' class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
							Search
						</label>
						<div class='relative'>
							<div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
								<svg
									class='w-4 h-4 text-gray-500 dark:text-gray-400'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
									/>
								</svg>
							</div>
							<input
								type='search'
								id='default-search'
								class='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Search for anything...'
								required
							/>
							<button
								type='submit'
								class='text-white absolute end-2 bottom-1.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Search
							</button>
						</div>
					</form>
				</div>
				{isLogged ? (
					<div className='flex items-center'>
						<ul>
							<li class='hover:text-purple-700'>
								<Link to='/instructor'>Instructor</Link>
							</li>
							<li class='hover:text-purple-700'>
								<Link to='/home/my-courses/learning'>My learning</Link>
							</li>
						</ul>
						<img src={heart} alt='Wishlist' className='wishlist mx-4'></img>
						<img src={cart} alt='Cart' className='cart mx-4'></img>
						<Menu as='div' className='relative ml-4'>
							<div>
								<Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
									<img id='preview' src={createImageFromInitials(40, username, getColor())} alt='profile-pic' className='avatar' />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<Menu.Item>
										{({ active }) => (
											<a href='/user/public-profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
												My public profile
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a
												href='/home/my-courses/learning'
												className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
											>
												My learning
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a
												href='/home/my-courses/wishlist'
												className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
											>
												Wishlist
											</a>
										)}
									</Menu.Item>
									<hr />
									<Menu.Item>
										{({ active }) => (
											<a href='/user/edit-profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
												Edit profile
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a href='/user/account-settings' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
												Account settings
											</a>
										)}
									</Menu.Item>
									<hr />
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={logout}
												className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700')}
											>
												Logout
											</button>
										)}
									</Menu.Item>
									<hr />
									<div className='flex flex-row justify-between'>
										<a href='/about-us' className={classNames('px-4 py-2 text-xs text-gray-600')}>
											About Udemy
										</a>
										<a href='/help' className={classNames('px-4 py-2 text-xs text-gray-600')}>
											Help
										</a>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				) : (
					<div className='flex items-center'>
						<button class='bg-white hover:bg-gray-200 text-black font-bold py-1 px-4 border-2 border-gray-900 rounded mx-2'>
							<Link to='/login'>Login</Link>
						</button>
						<button class='bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 px-4 border-2 border-gray-900 rounded'>
							<Link to='/register'>Sign up</Link>
						</button>
					</div>
				)}
			</div>
			<div class='divider'>
				<hr />
			</div>
		</div>
	);
};

export default Navbar;
