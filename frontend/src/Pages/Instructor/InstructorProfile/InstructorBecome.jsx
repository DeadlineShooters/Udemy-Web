import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../../AuthContextProvider';
import 'react-multi-carousel/lib/styles.css';
import { Button } from "@material-tailwind/react";
import secureLocalStorage from "react-secure-storage";
import { Image } from "cloudinary-react";

const courseBenefit = {
	goal1: { publicId: 'Goal1' },
	goal2: { publicId: 'Goal2' },
	goal3: { publicId: 'Goal3' },
};
  
const InstructorRegister = () => {
	const { userData, setUser } = useAuth();
	const userId = userData._id;
	const [isChecked, setChecked] = useState(false);
	const navigate = useNavigate();

	const becomeInstructor = async () => {
		try {
			const response = await axios.post("http://localhost:5000/user/become-instructor", {
				userId
			})
			console.log("Data cap nhat: ", response.data);
			if (response.status === 200) {
				const userData = await response.data;
				setUser(userData);
				secureLocalStorage.setItem('user', JSON.stringify(userData));
				navigate("/instructor/courses", {replace: true})
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className='flex flex-col justify-center items-center'>
		<p className='text-2xl font-bold my-10'>Join us & Gain benefits</p>
		<div className='flex flex-wrap justify-center m-auto w-full'>
		{Object.keys(courseBenefit).map((goal, index) => (
			<div key={index} className='card flex flex-col'>
			<div className='rounded-xl shadow-lg flex-grow'>
				<div className='p-3 flex flex-col h-full justify-between'>
				<div className='rounded-xl overflow-hidden justify-between relative'>
					<div className='rounded-xl overflow-hidden'>
					<Image
						className="w-full h-full"
						cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} 
						publicId={courseBenefit[goal].publicId}
						alt='course placeholder'
						style={{ transition: 'transform 0.3s', transformOrigin: 'center', cursor: 'pointer' }}
						onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
						onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
					/>
					</div>
				</div>
				</div>
			</div>
			</div>
		))}
		</div>
		<Button color="purple" className="rounded-none hover:bg-violet-800 my-10" style={{height: "48px"}} onClick={() => becomeInstructor()}>
			<span className="font-bold text-base normal-case">Become Udemy Instructor</span>
		</Button>
	</div>
	);
};
  

export default InstructorRegister;