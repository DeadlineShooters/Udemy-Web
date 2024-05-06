import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Drawer from 'react-modern-drawer';
import axios from 'axios';
import { RenderStars } from '../../../Components/StarRatings';
import 'react-multi-carousel/lib/styles.css';
import './search.css';
import 'react-modern-drawer/dist/index.css';
import { Select, Option, Accordion, AccordionHeader, AccordionBody, Checkbox, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';

const filterFields = ['Ratings', 'Video Duration', 'Price'];

const filterOptions = [
	[4.5, 4.0, 3.5, 3.0],
	['0-3 hours', '3-6 hours', '6-9 hours', '9-12 hours', '12+ hours'],
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

const Search = () => {
	let { categoryId } = useParams();
	const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });
	const refContainer = useRef();
	const [containerWidth, setContainerWidth] = useState(0);
	const [sortBy, setSortBy] = useState('mostPopular');
	const [openFilters, setOpenFilters] = useState(filterFields.map(() => 0));
	const [openFilterBar, setOpenFilterBar] = useState(false);
	const [openFilterBarSm, setOpenFilterBarSm] = useState(false);
	const [courses, setCourses] = useState([]);
	const [filterCourses, setFilterCourses] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);

	const [searchParams] = useSearchParams();
	const query = searchParams.get('query');

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
		if (refContainer.current) {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
		}
	}, [containerWidth]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/courses/search?query=${query}`)
			.then((response) => {
				if (response.data.success) {
					setCourses(response.data.courses);
					setFilterCourses(response.data.courses);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, [query]);

	useEffect(() => {
		let sortedCourses = [...filterCourses];

		switch (sortBy) {
			case 'mostPopular':
				sortedCourses.sort((a, b) => b.totalStudent - a.totalStudent);
				break;
			case 'highestRated':
				sortedCourses.sort((a, b) => b.avgRating - a.avgRating);
				break;
			case 'newest':
				sortedCourses.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
				break;
			default:
				break;
		}

		setFilterCourses(sortedCourses);
	}, [sortBy]);

	useEffect(() => {
		if (openFilterBarSm) {
			return;
		}
		let newCourses = [...courses];
		for (let field in selectedFilters) {
			if (selectedFilters[field].length === 0) continue;
			newCourses = newCourses.filter((course) => {
				if (field === 'Ratings') {
					return course.avgRating >= Math.min(...selectedFilters[field]);
				} else if (field === 'Video Duration') {
					return selectedFilters[field].some((range) => {
						const selectedRange = range.split('-');
						const minHoursInSeconds = parseFloat(selectedRange[0]) * 3600;
						const maxHoursInSeconds = selectedRange[1] === '12+ hours' ? Infinity : parseFloat(selectedRange[1]) * 3600;
						return course.totalLength >= minHoursInSeconds && course.totalLength <= maxHoursInSeconds;
					});
				} else if (field === 'Price') {
					return selectedFilters[field].includes(course.price === 0 ? 'Free' : 'Paid');
				}
				return true;
			});
		}

		setFilterCourses(newCourses);
	}, [selectedFilters, openFilterBarSm]);

	const handleOpenFilters = (ind) => setOpenFilters((prev) => prev.map((value, index) => (index === ind ? !value : value)));
	const toggleDrawer = () => {
		setOpenFilterBarSm((prevState) => !prevState);
	};

	const handleFilterOptionSelect = (field, option) => () => {
		setSelectedFilters((prev) => {
			const newFilters = { ...prev };
			if (!newFilters[field]) {
				newFilters[field] = [];
			}
			if (newFilters[field].includes(option)) {
				newFilters[field] = newFilters[field].filter((item) => item !== option);
			} else {
				newFilters[field] = [...newFilters[field], option];
			}
			console.log(newFilters);
			return newFilters;
		});
	};

	return (
		<>
			<div className='flex justify-center'>
				<div ref={refContainer} className='w-full max-w-[1340px] px-8'>
					<div className='font-bold text-3xl mt-12 mb-4'>
						{filterCourses.length} results for "{query}"
					</div>
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
						<span className='font-bold text-gray-600 text-md'>{filterCourses.length} results</span>
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
																onClick={handleFilterOptionSelect(field, option)}
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
							{filterCourses &&
								filterCourses.map((course) => (
									<div className='flex gap-4 pb-8 pt-4 '>
										<img className='w-24 h-24 object-cover object-center md:w-60 aspect[16:9]' src={course.thumbNail.secureURL} alt='' />
										<div className='pr-24 relative flex flex-col gap-1 w-full '>
											<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
											<span class='text-sm text-gray-700 font-medium'>{course.introduction}</span>
											<span class='text-xs text-gray-700'>
												{course.instructor.firstName} {course.instructor.lastName}
											</span>
											<div class='flex gap-1 items-center'>
												<span class='text-gray-900 font-bold text-sm'>{course.avgRating}</span>
												<div class='flex gap-0.5'>{RenderStars({ rating: course.avgRating })}</div>
												{/* <span class='text-gray-700 font-medium text-xs inline-block align-middle'>({course.ratingCnt.toLocaleString()})</span> */}
											</div>
											<div class='text-gray-700 text-xs align-middle'>
												{(course.totalLength / 3600).toFixed(3)} total hours • {course.totalLecture} lectures
											</div>
											<div class='flex items-center space-x-2'>
												{course.price === 0 ? (
													<span class='font-bold text-gray-900 '>Free</span>
												) : (
													<>
														<span class='font-bold text-gray-900 '>
															<span>{(course.price * 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
														</span>
														<span class='text-gray-700 line-through'>
															<span>{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
														</span>
													</>
												)}
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
															onClick={handleFilterOptionSelect(field, option)}
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
						<button
							className='bg-gray-900 text-white w-11/12 mx-auto flex justify-center p-2'
							onClick={() => {
								toggleDrawer();
							}}
						>
							Done
						</button>
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default Search;
