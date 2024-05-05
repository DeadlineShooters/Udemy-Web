import React, { useEffect, useState } from "react";
import { getColor, createImageFromInitials } from '../Utils/Utils';
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import axios from "axios";
import getTimeAgo from "../../helper/TimeAgo";
import { MdQuestionAnswer, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import ReactQuill from 'react-quill';
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "../../AuthContextProvider";
import AnsComp from "./AnsComp";
import QuesComp from "./QuesComp";


const maxChar = 255;

const CompQA = ({ courseId }) => {
	const { userData } = useAuth();
	const [questions, setQuestions] = useState([]);
	const [sortOldest, setSortOldest] = useState(false);
	const [showMoreQuestions, setShowMoreQuestions] = useState(false);
	const [isAddingQuestion, setIsAddingQuestion] = useState(false);
	const [questionDetails, setQuestionDetails] = useState(null);
	const [title, setTitle] = useState('');
	const [showAnswers, setShowAnswers] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState(null);
	
	const handleAddingQuestionRequest = async () => {
		const addQuestion = async (question) => {
			try {
				let config = {
					headers: {
						user_id: userData._id,
					}
				}
				const res = await axios.post(`http://localhost:5000/questions/${courseId}`, question, config);
				return res.data; // Return the added question data
			} catch (error) {
				console.error('Error sending the question:', error);
				throw error; // Rethrow the error to be caught by the caller
			}
		}

		try {
			await addQuestion({ title: title, description: questionDetails });
			setQuestionDetails(null); // Reset newAnswer after successfully adding the question
			setIsAddingQuestion(false); // Close the reply section
			await getQuestions();
		} catch (error) {
			// Handle error if necessary
		}
	}

	// Logic to toggle show more questions
	const toggleShowMoreQuestions = () => {
		setShowMoreQuestions(!showMoreQuestions);
	};

	const handleSelectingQuestion = (question) => {
		setShowAnswers(true);
		setSelectedQuestion(question)
	};

	const getQuestions = async () => {
		if (!courseId) return;

		try {
			// Define the sort order based on the state
			const sortOrder = sortOldest ? "asc" : "desc";

			// Construct the URL with the sort order query parameter
			const res = await axios.get(`http://localhost:5000/questions/${courseId}?sort=${sortOrder}`);
			const resQuestions = res.data;
			setQuestions(resQuestions);
		} catch (error) {
			console.error('Error fetching questions:', error);
		}
	};

	useEffect(() => {

		getQuestions(); // Call the async function
	}, [sortOldest, showAnswers]);

	const handleEditQuestion = async (editedQuestion) => {
		if (!editedQuestion) {
			setShowAnswers(false);
			return;
		}
    try {
			const res = await axios.get(`http://localhost:5000/questions/${selectedQuestion.course}/${selectedQuestion._id}`);
			setSelectedQuestion(res.data);
		} catch (error) {
			console.error('Error fetching question:', error);
		}
  };


	return (
		<div>
			<hr className="border-[0.5px] border-gray-300" />
			{/* <div className="flex flex-col">
                <div className="flex flex-row">
                    <p className="text-[#3d07bb] mr-2">Nguyen Minh Thong</p>
                    <p className="mr-2">2 days ago</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold line-clamp-2 leading-tight">2</p>
                    <p>1</p>
                </div>
            </div> */}

			<div className='w-[900px] mt-12 mx-auto mb-20'>
				{showAnswers ? (
					<div className="w-full">
						<button className="border-[1.5px] border-black p-2 font-bold" onClick={() => setShowAnswers(false)}>Back to Questions</button>
						<QuesComp question={selectedQuestion}  onUpdateQuestion={handleEditQuestion}  />
						<AnsComp question={selectedQuestion} />
					</div>

				) : (
					<div className='w-full'>
						<div className="flex justify-between border-black border">
							<input
								type="search"
								id="default-search"
								className="block w-full p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search course questions"
								required
							/>
							<button className="p-2 bg-black"><IconSearch stroke={2} color="white" /></button>
						</div>

						<div className='flex'>
							<div className='w-[600px]'>
								<p className='my-2 text-sm font-bold'>Sort by:</p>
								<select className="text-md hover:bg-gray-200 border border-black p-2" onChange={(e) => setSortOldest(e.target.value === 'oldest')}>
									<option value="newest" selected>Newest first</option>
									<option value="oldest">Oldest first</option>
								</select>
							</div>
						</div>

						<p className='mt-4 mb-2 font-bold text-lg'>Questions <span className="text-gray-600 font-bold text-md">({questions.length})</span></p>

						<div className="overflow-y-auto flex-grow">
							{questions.slice(0, showMoreQuestions ? questions.length : 5).map((question) => (
								<div key={question._id} onClick={() => { }}>
									<div className={"flex flex-row py-4 px-4 border-b-[1px] hover:cursor-pointer hover:bg-gray-200"} onClick={() => handleSelectingQuestion(question)}>
										<div className="mx-2 w-[30px] min-w-[30px]">
											<img id='preview' src={createImageFromInitials(130, question.user.firstName + " " + question.user.lastName, getColor())} alt='profile-pic' className='avatar' />
										</div>

										<div className="mx-2 flex-grow">
											<div className="mb-4">
												<p className="line-clamp-2 leading-tight font-bold">{question.title}</p>
												<p className="text-sm" dangerouslySetInnerHTML={{ __html: question.description }} />
											</div>
											<div className="flex flex-row text-xs items-center">
												<p className="font-bold text-purple-500">{question.user.firstName + " " + question.user.lastName}</p>
												<p className="text-lg mx-1">·</p>
												<p>{getTimeAgo(new Date(question.createdAt))}</p>
											</div>
										</div>

										<div className="flex items-start justify-end">
											<div className="flex flex-grow items-center gap-1">
												<span className="font-bold">{question.answers.length}</span>
												<MdQuestionAnswer className="text-gray-600" size={23} />
											</div>
										</div>
									</div>
								</div>
							))}
							{questions.length > 5 && (
								<div className="mt-2 mb-4 text-purple-500 cursor-pointer border-[1px] font-bold border-black py-2 hover:bg-gray-300" onClick={toggleShowMoreQuestions}>
									{showMoreQuestions ? (
										<div className="flex flex-row  justify-center items-center gap-1"><p>Show less</p> <MdKeyboardArrowUp size={20} /></div>
									) : (
										<div className="flex flex-row  justify-center items-center gap-1">Show more <MdKeyboardArrowDown size={20} /></div>
									)}
								</div>
							)}
							<div className="">
								{isAddingQuestion === true ? (
									<div>
										<p className="font-bold mb-2 mt-3">Title or summary</p>
										<div className="border border-black p-2 px-4 flex">
											<input
												type="text"
												placeholder="e.g. Why do we use fit_transform() for training set"
												onChange={(e) => setTitle(e.target.value)}
												className="flex-grow"
											/>
											<span className="text-gray-400">{maxChar - title.length}</span>
										</div>
										<p className="font-bold mb-2 mt-3">Details</p>
										<ReactQuill theme="snow" onChange={setQuestionDetails} style={{ height: "200px", marginBottom: "70px" }} />
										<div className="flex gap-3">
											<CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Send" callBack={handleAddingQuestionRequest} />
											<CustomButton text="Cancel" callBack={() => setIsAddingQuestion(false)} />
										</div>
									</div>
								) : (
									<CustomButton icon={null} text="Add a new question" callBack={() => setIsAddingQuestion(true)} />
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default CompQA;

export const CustomButton = ({ icon, text, callBack }) => {
	return (
		<button id="edit" className="flex bg-black text-sm hover:opacity-50 min-w-24 max-w-48 justify-center items-center p-2" onClick={callBack}>
			{icon}
			<p className="font-bold text-white mx-1">{text}</p>
		</button>
	)
}