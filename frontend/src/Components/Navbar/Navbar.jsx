import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/Udemy_logo.png';
import heart from '../../Assets/heart.png';
import cartIcon from '../../Assets/cart.png';
import { getColor, createImageFromInitials } from '../Utils/Utils.js';
import { useAuth } from '../../AuthContextProvider.jsx';
import { IconMenu2 } from '@tabler/icons-react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Menu as MenuMT, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { IconChevronLeft } from '@tabler/icons-react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { useCart, useWishlist } from '../../CartRouterProvider.js';

const Navbar = () => {
	const { userData } = useAuth();
	const { cart } = useCart();
	const { wishlist } = useWishlist();
	const isLogged = userData !== null;
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	const logout = () => {
		secureLocalStorage.clear();
    localStorage.clear();
		window.open('http://localhost:5000/auth/logout', '_self');
	};
	const [isTurnOnSideBar, setTurnOnSideBar] = useState(false);
	const sideBarToggle = () => {
		setTurnOnSideBar(!isTurnOnSideBar);
		console.log(isTurnOnSideBar);
	};
	const [isWishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);
	const toggleWishlistDropdown = () => {
		setWishlistDropdownOpen(!isWishlistDropdownOpen);
	};

	const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
	const toggleCartDropdown = () => {
		setCartDropdownOpen(!isCartDropdownOpen);
	};

	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = async (event) => {
		event.preventDefault();
		navigate(`/courses/search?query=${searchQuery}`);
	};

	const [categories, setCategories] = useState(null);

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
    <div className="header">
      <div className="navbar justify-between">
        <div className="flex items-center">
          <button type="button" className="md:hidden" onClick={sideBarToggle}>
            <IconMenu2 stroke={2} />
          </button>
          <div className="logo-udemy">
            <Link to="/">
              <img src={logo} alt="" className="logo"></img>
            </Link>
          </div>
          <ul className="category mx-5 relative">
            <MenuMT allowHover>
              <MenuHandler>
                <div className="cursor-pointer py-4">Categories</div>
              </MenuHandler>
              <MenuList className="min-h-[40rem] w-64 top-20 z-9999">
                {categories &&
                  categories.map((category, ind) => (
                    <MenuMT placement="right-start" allowHover offset={12}>
                      <MenuHandler className="flex items-center justify-between">
                        <MenuItem>
                          <a href={`/courses/${category.id}`} className="text-gray-900 hover:text-[#5624d0] w-full py-1">
                            {category.name}
                          </a>
                          <ChevronRightIcon strokeWidth={2.5} className={`h-3.5 w-3.5 `} />
                        </MenuItem>
                      </MenuHandler>
                      <MenuList className="min-h-[40rem] w-64 top-20">
                        {category.subCategories.map((subCategory) => (
                          <MenuItem>
                            <div className="text-gray-900 hover:text-[#5624d0] w-full py-1">{subCategory}</div>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </MenuMT>
                  ))}
              </MenuList>
            </MenuMT>
          </ul>
          <form onSubmit={handleSearch}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for anything..."
                required
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="text-white absolute end-2 bottom-1.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {isLogged === true ? (
          <div className={`flex items-center`}>
            <ul>
              {userData?.instructor ? (
                <li className="hover:text-purple-700 hide-teach-udemy">
                  <Link to="/instructor/courses">Instructor</Link>
                </li>
              ) : (
                <li className="hover:text-purple-700 hide-teach-udemy">
                  <Link to="/user/instructor-become">Teach on Udemy</Link>
                </li>
              )}
              <li className="hover:text-purple-700 hide-my-learning">
                <Link to="/home/my-courses/learning">My learning</Link>
              </li>
            </ul>
            <div className="relative" onMouseEnter={toggleWishlistDropdown} onMouseLeave={toggleWishlistDropdown}>
              <button id="dropdownSearchButton" className="flex items-center py-4 my-2" type="button">
                <img src={heart} alt="Wishlist" className="wishlist mx-4"></img>
              </button>
              {isWishlistDropdownOpen && (
                <div id="dropdownSearch" className="z-9999 absolute top-[calc(100%-1rem)] mt-2 right-0 bg-white shadow-[0_0_0_1px_#d1d7dc,0_2px_4px_rgba(0,0,0,.08),0_4px_12px_rgba(0,0,0,.08)] w-80">
                  <ul class="divide-y divide-gray-300 max-h-[32rem] pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
				  {wishlist &&
											wishlist.map((course) => (
												<button class='flex flex-col items-center p-4' onClick={() => {}}>
													<div className='flex items-center'>
														<div class='flex-shrink-0'>
															<img class='object-cover object-center w-16 h-16' src={course.thumbNail.secureURL} alt='' />
														</div>
														<div class='ps-3 flex flex-col gap-0.5'>
															<div class='text-gray-900 font-bold text-sm text-left line-clamp-2'>{course.name}</div>
															<div class='text-gray-900 text-xs text-left line-clamp-1'>
																{course.instructor.firstName} {course.instructor.lastName}
															</div>
															<div class='flex gap-2'>
																<span class='font-bold text-gray-900 '>
																	<span>{(course.price * 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
																</span>
																<span class='text-gray-700 line-through'>
																	<span>{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
																</span>
															</div>
														</div>
													</div>
												</button>
											))}
                  </ul>
                  <div className="sticky bottom-0 w-full bg-white shadow-[0_-2px_4px_rgba(0,0,0,.08),0_-4px_12px_rgba(0,0,0,.08)] py-4">
                    <a href="/home/my-courses/wishlist" className="font-bold bg-gray-900 text-white w-11/12 mx-auto flex justify-center p-3">
                      Go to wishlist
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={toggleCartDropdown} onMouseLeave={toggleCartDropdown}>
              <button id="dropdownSearchButton" className="flex items-center py-4 my-2" type="button">
                <img src={cartIcon} alt="Cart" className="cart mx-4"></img>
              </button>
              {isCartDropdownOpen && (
                <div id="dropdownSearch" className="z-9999  absolute top-[calc(100%-1rem)] mt-2 right-0 bg-white shadow-[0_0_0_1px_#d1d7dc,0_2px_4px_rgba(0,0,0,.08),0_4px_12px_rgba(0,0,0,.08)] w-80">
                  <ul className="divide-y divide-gray-300 max-h-[32rem] pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
                    {cart &&
                      cart.map((course) => (
                        <button className="flex flex-col items-center p-4" onClick={() => {}}>
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img className="object-cover object-center w-16 h-16" src={course.thumbNail.secureURL} alt="" />
                            </div>
                            <div className="ps-3 flex flex-col gap-0.5">
                              <div className="text-gray-900 font-bold text-sm text-left line-clamp-2">{course.name}</div>
                              <div className="text-gray-900 text-xs text-left line-clamp-1">
                                {course.instructor.firstName} {course.instructor.lastName}
                              </div>
                              <div className="flex gap-2">
                                <span className="font-bold text-gray-900 ">
                                  <span className="underline">đ</span>
                                  {(course.price * 0.8).toLocaleString()}
                                </span>
                                <span className="text-gray-700 line-through">
                                  <span className="underline">đ</span>
                                  {course.price.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                  </ul>
                  <div className="sticky bottom-0 w-full bg-white shadow-[0_-2px_4px_rgba(0,0,0,.08),0_-4px_12px_rgba(0,0,0,.08)] p-4">
                    <div className="flex gap-2 items-center mb-2">
                      <span className="font-bold text-gray-900 text-xl">
                        <span>Total: </span>
                        <span className="underline">đ</span>
                        {cart && cart.reduce((acc, course) => acc + course.price * 0.8, 0).toLocaleString()}
                      </span>
                      <span className="text-gray-700 line-through">
                        <span className="underline">đ</span>
                        {cart && cart.reduce((acc, course) => acc + course.price, 0).toLocaleString()}
                      </span>
                    </div>
                    <a href="/cart" className="font-bold bg-gray-900 text-white w-full mx-auto flex justify-center p-3">
                      Go to cart
                    </a>
                  </div>
                </div>
              )}
            </div>
            <Menu as="div" className="user relative ml-4">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img id="preview" src={createImageFromInitials(40, userData.firstName + " " + userData.lastName, getColor())} alt="profile-pic" className="avatar" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-99999 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="/home/my-courses/learning" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                        My learning
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="/home/my-courses/wishlist" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                        Wishlist
                      </a>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <a href="/user/edit-profile" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                        Edit profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a href="/user/account-settings" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                  <hr />
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={logout} className={classNames(active ? "bg-gray-100 w-full text-left" : "", "block px-4 py-2 text-sm text-gray-700")}>
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                  <hr />
                  <div className="flex flex-row justify-between">
                    <a href="/about-us" className={classNames("px-4 py-2 text-xs text-gray-600")}>
                      About Udemy
                    </a>
                    <a href="/help" className={classNames("px-4 py-2 text-xs text-gray-600")}>
                      Help
                    </a>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className={`flex items-center max-md:hidden`}>
            <button className={`bg-white hover:bg-gray-200 text-black font-bold py-1 px-4 max-lg:px-2 border-2 border-gray-900 rounded mx-2`}>
              <Link to="/login">Login</Link>
            </button>
            <button className={`bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 px-4 border-2 max-lg:px-1 border-gray-900 rounded`}>
              <Link to="/register">Sign up</Link>
            </button>
          </div>
        )}
      </div>
      {isLogged === true ? (
        <div className={`sidebar md:hidden ${isTurnOnSideBar ? "open" : ""} border-r-2 shadow-xl`}>
          <div className="flex flex-row items-center bg-slate-50 py-2">
            <div className="flex rounded-full text-sm focus:ring-2 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-5">
              <img id="preview" src={createImageFromInitials(80, userData.firstName + " " + userData.lastName, getColor())} alt="profile-pic" className="avatar" />
            </div>
            <div className="flex flex-col ml-5">
              <p className="font-bold">Hi, {userData.firstName + " " + userData.lastName} </p>
              <p className="">Welcome back</p>
            </div>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <p className="font-bold text-violet-600">Teach on Udemy</p>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <Link to="/home/my-courses/learning">
              <p className="font-bold mb-3">My learning</p>
            </Link>
            <Link to="/home/my-courses/wishlist">
              <p className="font-bold mb-3">Wishlist</p>
            </Link>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <p className="font-bold mb-3">Account</p>
            <Link to="/user/edit-profile">
              <p className="mb-3">Edit profile</p>
            </Link>
            <Link to="/user/account-settings">
              <p className="mb-3">Account settings</p>
            </Link>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <p className="font-bold mb-3">Logout</p>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <p className="font-bold mb-3">More about Udemy</p>
            <Link to="/about-udemy">
              <p className="mb-3">About us</p>
            </Link>
            <Link to="/help">
              <p className="mb-3">Help</p>
            </Link>
          </div>
          <hr />
          <button type="button" className="w-20 h-10 bg-slate-700 rounded-full flex items-center ml-5 mt-10 z-9999" onClick={() => setTurnOnSideBar()}>
            <IconChevronLeft stroke={2} className="flex justify-center w-full" color="white" />
          </button>
        </div>
      ) : (
        <div className={`sidebar md:hidden ${isTurnOnSideBar ? "open" : ""} border-r-2 shadow-xl`}>
          <div className="ml-5 py-3">
            <Link to="/login">
              <p className="font-bold mb-3">Login</p>
            </Link>
            <Link to="/register">
              <p className="font-bold mb-3">Sign up</p>
            </Link>
          </div>
          <hr />
          <div className="ml-5 py-3">
            <p className="font-bold mb-3">More about Udemy</p>
            <Link to="/about-udemy">
              <p className="mb-3">About us</p>
            </Link>
            <Link to="/help">
              <p className="mb-3">Help</p>
            </Link>
          </div>
          <hr />
          <button type="button" className="w-20 h-10 bg-slate-700 rounded-full flex items-center ml-5 mt-10 z-99999" onClick={() => setTurnOnSideBar()}>
            <IconChevronLeft stroke={2} className="flex justify-center w-full" color="white" />
          </button>
        </div>
      )}

			<div className='divider'>
				<hr />
			</div>
		</div>
	);
};

export default Navbar;
