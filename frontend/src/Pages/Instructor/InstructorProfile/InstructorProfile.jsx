import React, {useState} from "react";

import LinkButton from "../../../Components/InstructorProfile/LinkButton";
import CourseCard from "../../../Components/InstructorProfile/CourseCard";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Pagination from "../../../Components/InstructorProfile/Pagination";
const profileImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const MAX_HEIGHT = 200; // Maximum height for the about-me div

const InstructorProfile = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


	const courses = [{}, {}, {}, {}, {}];
	const instructorInfo = {
		name: 'Stephane Maarek | AWS Certified Cloud Practitioner,Solutions Architect,Developer',
		headline: 'Best Selling Instructor, 10x AWS Certified, Kafka Guru',
		badge: 'Udemy Instructor Partner',
		totalStudents: 2439390,
		reviews: 762622,
	}

	return (
		<div
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
					<LinkButton text={"Twitter"} />
					<LinkButton text={"Facebook"} />
					<LinkButton text={"LinkedIn"} />
					<LinkButton text={"YouTube"} />
				</div>
			</div>
			<div className="container relative pr-16">
				<div className="instructor-info">
					<div className="font-bold text-slate-500">INSTRUCTOR</div>
					<h1 className="text-4xl font-bold">{instructorInfo.name}</h1>
					<h2 className="font-bold py-2">{instructorInfo.headline}</h2>
					<div>
						<div className="inline text-xs px-2 py-1 bg-indigo-300 font-bold">{instructorInfo.badge}</div>
					</div>
					<div className="instructor-stats flex mt-4">
						<div>
							<div className="mb-2 font-bold text-slate-500">Total students</div>
							<div className="text-2xl font-bold">{instructorInfo.totalStudents.toLocaleString()}</div>
						</div>
						<div className="ml-6">
							<div className="mb-2 font-bold text-slate-500">Reviews</div>
							<div className="text-2xl font-bold">{instructorInfo.reviews.toLocaleString()}</div>
						</div>
					</div>

					<h2 className="pt-12 pb-4 font-bold text-xl">About me</h2>
					<div className="about-me relative" style={{ maxHeight: isCollapsed ? `${MAX_HEIGHT}px` : "none", overflow: "hidden" }}>
						{isCollapsed && (
							<div className="gradient-layer absolute top-0 left-0 w-full h-full" style={{ 
								backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
							}} />
						)}
						<div>
							<p>
								Stephane is a solutions architect, consultant and software
								developer that has a particular interest in all things related
								to Big Data, Cloud & API. He's also a many-times best seller
								instructor on Udemy for his courses in AWS and Apache Kafka.
							</p>
							<p className="mt-2 font-bold">
								[See FAQ below to see in which order you can take my courses]
							</p>
							<p className="mt-2">
								Stéphane is recognized as an AWS Hero and is an AWS Certified
								Solutions Architect Professional & AWS Certified DevOps
								Professional. He loves to teach people how to use the AWS
								properly, to get them ready for their AWS certifications, and
								most importantly for the real world.
							</p>
							<p className="mt-2">
								He also loves Apache Kafka. He sits on the 2019 Program
								Committee organizing the Kafka Summit in New York, London and
								San Francisco. He is also an active member of the Apache Kafka
								community, authoring blogs on Medium and a guest blog for
								Confluent.
							</p>
							<p className="mt-2">
								During his spare time he enjoys cooking, practicing yoga,
								surfing, watching TV shows, and traveling to awesome
								destinations!
							</p>
							<p className="mt-2">&nbsp;</p>
							<p className="mt-2 font-bold">
								FAQ: In which order should you learn?...
							</p>
							<p className="mt-2">
								<b>AWS Cloud:</b> Start with AWS Certified Solutions Architect
								Associate, then move on to AWS Certified Developer Associate and
								then AWS Certified SysOps Administrator. Afterwards you can
								either do AWS Certified Solutions Architect Professional or AWS
								Certified DevOps Professional, or a specialty certification of
								your choosing.
							</p>
							<p className="mt-2">&nbsp;</p>
							<p className="mt-2">
								<b>Apache Kafka:</b> Start with Apache Kafka for Beginners, then
								you can learn Connect, Streams and Schema Registry if you're a
								developer, and Setup and Monitoring courses if you're an admin.
								Both tracks are needed to pass the Confluent Kafka
								certification.
							</p>
						</div>
					</div>
					{isCollapsed ? (
						<div className="text-sm font-bold text-purple-700 cursor-pointer" onClick={toggleCollapse}>
							Show more <MdKeyboardArrowDown className="inline" />
						</div>
					) : (
						<div className="text-sm font-bold text-purple-700 cursor-pointer" onClick={toggleCollapse}>
							Show less <MdKeyboardArrowUp className="inline" />
						</div>
					)}
				</div>
				<div className="instructor-courses mt-6">
					<h2 className="mb-6 font-bold text-xl">My courses (66)</h2>
					<div className="courses grid grid-cols-2 gap-4 mb-8">
						{courses.map((course) => (
							<CourseCard instructorInfo={instructorInfo} />
						))}
					</div>
					<div className="pagination">
						<Pagination/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InstructorProfile;
