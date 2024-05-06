import React, { useEffect, useState, useRef } from "react";

import LinkButton from "../../../Components/InstructorProfile/LinkButton";
import CourseCard from "../../../Components/InstructorProfile/CourseCard";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Pagination from "../../../Components/InstructorProfile/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { PiGlobeBold } from "react-icons/pi";


const profileImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const MAX_HEIGHT = 200; // Maximum height for the about-me div

const InstructorProfile = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [user, setUser] = useState(null);
	const [courseList, setCourseList] = useState(null);
	const [totalCourseNum, setTotalCourseNum] = useState(null);

	const [isOverflowed, setIsOverflowed] = useState(false);
	const bioRef = useRef(null);

	useEffect(() => {
		const bioDiv = bioRef.current;
		if (bioDiv) {
			setIsOverflowed(bioDiv.clientHeight > MAX_HEIGHT);
		}
	}, []);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	const getCourseList = async (page = 1, limit = 6) => {
		try {
			const res = await axios.post(`http://localhost:5000/instructor/get-course?page=${page}&limit=${limit}`, { instructorID: userId })
			return res.data.course;
		} catch (e) {
			console.error("Error fetch course list: ", e);
		}
	}

	useEffect(() => {
		const getUser = async (userId) => {
			try {
				const res = await axios.get(`http://localhost:5000/instructor/${userId}`);
				console.dir(res.data)
				setUser(res.data);
			} catch (e) {
				console.error("Error retrieving user", e);
			}
		};

		getUser(userId);

		const fetchCourseList = async () => {
			const courseListData = await getCourseList();
			setCourseList(courseListData);

			const allCourses = await getCourseList(1, 100)
			// alert(allCourses.length)
			setTotalCourseNum(allCourses.length);
		}

		fetchCourseList()
	}, []);


	const handleSelectPage = async (page) => {
		const courseListData = await getCourseList(page);
		setCourseList(courseListData)
	}

	return (
		<div>
			{user && courseList ?
				(<div
					className="main w-full mt-12 px-5 flex flex-row-reverse mx-auto"
					style={{ maxWidth: "912px" }}
				>

					<div style={{ width: "200px" }}>
						<img
							className="instructor-image instructor-image rounded-full mb-5 object-cover"
							style={{ width: "200px", height: "200px" }}
							src={profileImage}
							alt={"Instructor profile image"}
						/>
						<div className="instructor-social-links flex flex-col">
							<LinkButton text={"Web"} href={user.socialLinks.web} icon={<PiGlobeBold size={20}/>}/>
							<LinkButton text={"YouTube"} href={user.socialLinks.youtube} icon={<FaYoutube size={17}/>} />
							<LinkButton text={"Facebook"} href={user.socialLinks.facebook} icon={<FaFacebook size={17}/>} />
						</div>
					</div>
					<div className="container relative pr-16">
						<div className="instructor-info">
							<div className="font-bold text-slate-500">INSTRUCTOR</div>
							<h1 className="text-4xl font-bold">{user.firstName + " " + user.lastName}</h1>
							<h2 className="font-bold py-2">{user.instructor.headline}</h2>
							<div>
								<div className="inline text-xs px-2 py-1 bg-indigo-300 font-bold">Udemy Instructor Partner</div>
							</div>
							<div className="instructor-stats flex mt-4">
								<div>
									<div className="mb-2 font-bold text-slate-500">Total students</div>
									<div className="text-2xl font-bold">{user.instructor.totalStudents.toLocaleString()}</div>
								</div>
								<div className="ml-6">
									<div className="mb-2 font-bold text-slate-500">Reviews</div>
									<div className="text-2xl font-bold">{user.instructor.totalReviews.toLocaleString()}</div>
								</div>
							</div>
							<h2 className="pt-12 pb-4 font-bold text-xl">About me</h2>

							<div className="about-me relative" style={{ maxHeight: isCollapsed ? `${MAX_HEIGHT}px` : "none", overflow: "hidden" }}>
								<div className="gradient-layer absolute top-0 left-0 w-full h-full" style={{
									backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
									display: isCollapsed ? "block" : "none"
								}} />
								<div className="bio" ref={bioRef}>
									<p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: user.instructor.bio }} />
								</div>
							</div>
							{isOverflowed && (
								<div className="text-sm font-bold text-purple-700 cursor-pointer" onClick={toggleCollapse}>
									{isCollapsed ? (
										<div className="flex items-center">Show more <MdKeyboardArrowDown size={20} /></div>
									) : (
										<div className="flex items-center">Show less <MdKeyboardArrowUp size={20} /></div>
									)} 
								</div>
							)}

						</div>
						<div className="instructor-courses mt-6">
							<h2 className="mb-6 font-bold text-xl">My courses ({courseList.length})</h2>
							<div className="courses grid grid-cols-2 gap-4 mb-8">
								{Array.isArray(courseList) ? (
									courseList.map((course, index) => (
										<CourseCard key={index} user={user} course={course} />
									))
								) : (
									<p>No courses available.</p>
								)}
							</div>
							<div className="pagination">
								{totalCourseNum && (<Pagination totalCourseNum={totalCourseNum} onSelectPage={handleSelectPage} />)}
							</div>
						</div>
					</div>
				</div>
				) : (
					<div>Loading...</div>
				)}
		</div>
	);
};

export default InstructorProfile;
