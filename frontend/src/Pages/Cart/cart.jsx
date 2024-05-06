import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../AuthContextProvider.jsx';
import axios from 'axios';
import { useCart, useWishlist } from '../../CartRouterProvider.js';
import { RenderStars } from '../../Components/StarRatings.jsx';
import 'react-multi-carousel/lib/styles.css';
import 'react-modern-drawer/dist/index.css';

const Cart = () => {
	const { userData } = useAuth();
	const refContainer = useRef();
	const [containerWidth, setContainerWidth] = useState(0);
	const [amount, setAmount] = useState(0);
	const { cart, setCart } = useCart();
	const { wishlist, setWishlist } = useWishlist();

	useEffect(() => {
		setContainerWidth(refContainer.current.offsetWidth);

		const handleResize = () => {
			setContainerWidth(refContainer.current.offsetWidth);
			document.documentElement.style.setProperty('--containerWidth', `${containerWidth}px`);
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
		setAmount(cart.reduce((acc, course) => acc + course.price * 0.8, 0));
	}, [cart]);

	const handlePayment = async () => {
		try {
			const exchangeRateResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
			const exchangeRateData = await exchangeRateResponse.json();
			const exchangeRate = exchangeRateData.rates.VND;

			const response = await axios.post('http://localhost:5000/payment', {
				userId: userData._id,
				courseId: '',
				amount: parseInt(amount * exchangeRate),
			});
			if (response.data.success) {
				window.location.href = response.data.payUrl;
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const cartToWishlist = async (courseId) => {
		try {
			const response = await axios.post('http://localhost:5000/wishlist/add-to-wishlist', {
				userId: userData._id,
				courseId,
			});
			if (response.data.success) {
				console.log(response.data.course);
				setCart((oldCart) => oldCart.filter((course) => course._id !== courseId));
				setWishlist((oldWishlist) => [...oldWishlist, response.data.course]);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const wishlistToCart = async (courseId) => {
		try {
			const response = await axios.post('http://localhost:5000/cart/add-to-cart', {
				userId: userData._id,
				courseId,
			});
			if (response.data.success) {
				setWishlist((oldWishlist) => oldWishlist.filter((course) => course._id !== courseId));
				setCart((oldCart) => [...oldCart, response.data.course]);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const removeFromCart = async (courseId) => {
		try {
			const response = await axios.post('http://localhost:5000/cart/remove-from-cart', {
				userId: userData._id,
				courseId,
			});
			if (response.data.success) {
				setCart((oldCart) => oldCart.filter((course) => course._id !== courseId));
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const removeFromWishlist = async (courseId) => {
		try {
			const response = await axios.post('http://localhost:5000/wishlist/remove-from-wishlist', {
				userId: userData._id,
				courseId,
			});
			if (response.data.success) {
				setWishlist((oldWishlist) => oldWishlist.filter((course) => course._id !== courseId));
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<>
			<div className='flex justify-center mb-32'>
				<div ref={refContainer} className='w-full max-w-[1340px] px-12 pt-12'>
					<div className='font-bold text-4xl mb-4'>Shopping Cart</div>
					<div className='flex flex-col-reverse md:flex-row'>
						<div className='grow'>
							{cart.length > 0 ? (
								<div className='w-full'>
									<div className='font-bold mb-2 mt-8'>
										{cart.length} {cart.length === 1 ? 'Course' : 'Courses'} in Cart
									</div>
									<ul className='divide-y divide-gray-300 border-t border-gray-300'>
										{cart.map((course) => (
											<div className='py-4 grid xl:grid-cols-[8rem_auto_8rem_8rem] md:grid-cols-[8rem_auto_8rem_] grid-cols-[5rem_auto_8rem]'>
												<img className='w-16 h-16 object-cover object-center lg:w-28 lg:h-fit' src={course.thumbNail.secureURL} alt='' />
												<div className='flex gap-4'>
													<div className='relative flex flex-col gap-1 '>
														<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
														<span class='text-xs text-gray-700'>
															{course.instructor.firstName} {course.instructor.lastName}
														</span>
														<div class='flex gap-1 items-center'>
															<span class='text-gray-900 font-bold text-sm'>{course.avgRating}</span>
															<div class='flex gap-0.5'>{RenderStars({ rating: course.avgRating })}</div>
														</div>
														<div class='text-gray-700 text-xs align-middle'>
															{course.totalLength} total hours • {course.totalLecture} lectures
														</div>
													</div>
												</div>

												<div className='mt-2 xl:mt-0 row-start-2 col-start-2 col-span-full xl:col-span-1 xl:col-start-auto xl:row-auto flex xl:flex-col items-end text-sm gap-4 xl:gap-1 text-[#5624d0]'>
													<button onClick={() => removeFromCart(course._id)}>Remove</button>
													<button onClick={() => cartToWishlist(course._id)}>Move to Wishlist</button>
												</div>

												<div class='flex flex-col pl-12'>
													<span class='font-bold text-[#a435f0] flex items-center'>
														<span>{(course.price * 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
														<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1 self-end'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z'
																fill='#a435f0'
															></path>
														</svg>
													</span>
													<span class='text-gray-700 line-through'>
														<span>{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
													</span>
												</div>
											</div>
										))}
									</ul>
								</div>
							) : null}

							{wishlist.length > 0 ? (
								<div className='w-full'>
									<div className='font-bold mb-2 mt-8'>Recently wishlisted</div>
									<ul className='divide-y divide-gray-300 border-t border-gray-300'>
										{wishlist.map((course) => (
											<div className='py-4 grid xl:grid-cols-[8rem_auto_8rem_8rem] md:grid-cols-[8rem_auto_8rem_] grid-cols-[5rem_auto_8rem]'>
												<img className='w-16 h-16 object-cover object-center lg:w-28 lg:h-fit' src={course.thumbNail.secureURL} alt='' />
												<div className='flex gap-4'>
													<div className='relative flex flex-col gap-1 '>
														<h3 class='font-bold text-gray-900 line-clamp-2 leading-tight'>{course.name}</h3>
														<span class='text-xs text-gray-700'>
															{course.instructor.firstName} {course.instructor.lastName}{' '}
														</span>
														<div class='flex gap-1 items-center'>
															<span class='text-gray-900 font-bold text-sm'>{course.avgRating}</span>
															<div class='flex gap-0.5'>{RenderStars({ rating: course.avgRating })}</div>
															{/* <span class='text-gray-700 font-medium text-xs inline-block align-middle'>
																({course.ratingCnt.toLocaleString()})
															</span> */}
														</div>
														<div class='text-gray-700 text-xs align-middle'>
															{course.totalLength} total hours • {course.totalLecture} lectures
														</div>
													</div>
												</div>

												<div className='mt-2 xl:mt-0 row-start-2 col-start-2 col-span-full xl:col-span-1 xl:col-start-auto xl:row-auto flex xl:flex-col items-end text-sm gap-4 xl:gap-1 text-[#5624d0]'>
													<button onClick={() => removeFromWishlist(course._id)}>Remove</button>
													<button onClick={() => wishlistToCart(course._id)}>Move to Cart</button>
												</div>

												<div class='flex flex-col pl-12'>
													<span class='font-bold text-[#a435f0] flex items-center'>
														<span>{(course.price * 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
														<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 ml-1 self-end'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z'
																fill='#a435f0'
															></path>
														</svg>
													</span>
													<span class='text-gray-700 line-through'>
														<span>{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
													</span>
												</div>
											</div>
										))}
									</ul>
								</div>
							) : null}
						</div>
						<div className='flex flex-col grow min-w-72 xl:ml-12 lg:ml-8 md:ml-4 gap-0.5'>
							<span className='font-bold text-gray-600 mb-2'>Total: </span>
							<span class='font-bold text-gray-900 text-4xl'>{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
							<span class='text-gray-700 line-through'>{(amount / 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
							<span className='mb-2.5 text-gray-900'>20% off</span>
							<button className='w-full bg-[#a435f0] text-white p-3 font-bold mb-4' onClick={handlePayment}>
								Checkout
							</button>
							<div className='w-full border-t border-gray-300 py-2 font-bold text-gray-800'>Promotions</div>
							<form action='' className='flex text-sm items-center'>
								<input className='border border-gray-700 px-4 py-2 w-full box-border outline-none' placeholder='Enter Coupon' />
								<button className='bg-[#a435f0] text-white px-4 py-2 border border-[#a435f0] font-bold'>Apply</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
