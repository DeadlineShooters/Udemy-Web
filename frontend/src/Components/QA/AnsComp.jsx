import React, { useEffect, useState } from "react";
import { getColor, createImageFromInitials } from '../Utils/Utils';
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import axios from "axios";
import getTimeAgo from "../../helper/TimeAgo";
import { MdQuestionAnswer, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import ReactQuill from 'react-quill';
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "../../AuthContextProvider";
import { AiOutlineEllipsis } from 'react-icons/ai';
import WarningModal from "./WarningModal";

const AnsComp = ({ question }) => {
	const { userData } = useAuth();
	const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
	const [editingIndex, setEditingIndex] = useState(null);
	const [editedQuestion, setEditedQuestion] = useState(null);
	const [newAnswer, setNewAnswer] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [showMoreAnswers, setShowMoreAnswers] = useState(false);
	const [selectedAnswerIdToDelete, setSelectedAnswerIdToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [isReplying, setIsReplying] = useState(false);


	// Logic to toggle show more answers
	const toggleShowMoreAnswers = () => {
		setShowMoreAnswers(!showMoreAnswers);
	};

	const toggleDropdown = (index) => {
		setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleEditOption = (answer, index) => {
		// Implement your edit logic here
		console.log('Editing answer:', answer._id);
		setNewAnswer(answer.content);
		setEditingIndex(index);
		setOpenDropdownIndex(null); // Close dropdown after selecting edit
	};

	const handleDeleteOption = (answerId) => {
		// Show the delete modal and store the answer ID
		setShowDeleteModal(true);
		setSelectedAnswerIdToDelete(answerId);
	};

	const handleCancelDelete = () => {
		// Hide the delete modal and reset the selected answer ID
		setShowDeleteModal(false);
		setSelectedAnswerIdToDelete(null);
	};

	const handleConfirmDelete = async () => {
		// Hide the delete modal
		setShowDeleteModal(false);

		// Call the delete request
		await handleDeleteRequest(selectedAnswerIdToDelete);
	};

	const handleDeleteRequest = async (answerId) => {
		try {

			// Define deleteAnswer as an asynchronous function
			const deleteAnswer = async () => {
				const res = await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/questions/${question._id}/answers/${answerId}`);
				return res.data; // Return the edited answer data
			}

			// Call deleteAnswer and await its completion
			await deleteAnswer();

			setNewAnswer(null);
			getAnswers(); // Assuming getAnswers fetches the updated list of answers
		} catch (error) {
			console.error('Error deleting the answer:', error);
		}
	}

	const handleEditRequest = async (editedAnswerId) => {
		try {

			// Define editAnswer as an asynchronous function
			const editAnswer = async (answer) => {
				const res = await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/questions/${question._id}/answers/${editedAnswerId}`, answer);
				return res.data; // Return the edited answer data
			}

			// Call editAnswer and await its completion
			await editAnswer({ content: newAnswer });

			// Update state and fetch answers after the answer is successfully edited
			setEditingIndex(null);
			setNewAnswer(null);
			await getAnswers(); // Assuming getAnswers fetches the updated list of answers
		} catch (error) {
			console.error('Error editing the answer:', error);
		}
	}

	const handleSendingAnswer = async () => {
		if (!newAnswer || newAnswer.length === 0) return;
		const addAnswer = async (answer) => {
			try {
				let config = {
					headers: {
						user_id: userData._id,
					}
				}
				const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/questions/${question._id}/answers`, answer, config);
				return res.data; // Return the added answer data
			} catch (error) {
				console.error('Error sending the answer:', error);
				throw error; // Rethrow the error to be caught by the caller
			}
		}

		try {
			await addAnswer({ content: newAnswer });
			setNewAnswer(null); // Reset newAnswer after successfully adding the answer
			setIsReplying(false); // Close the reply section
			await getAnswers(); // Fetch answers after adding a new one
		} catch (error) {
			// Handle error if necessary
		}
	}

	const getAnswers = async () => {

		try {
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/questions/${question._id}/answers`);
			const resAnswers = res.data;
			setAnswers(resAnswers);
		} catch (error) {
			console.error('Error fetching answers:', error);
		}
	};

	useEffect(() => {

		getAnswers(); // Call the async function
	}, []);


	return (
		<div>
			<p className="font-bold">{answers.length} replies</p>
			<div>
				{answers && answers.slice(0, showMoreAnswers ? answers.length : 5).map((answer, index) => (
					<div className="flex flex-row px-6 py-4">
						<div className="w-[50px] min-w-[50px]">
							<img id='preview' src={createImageFromInitials(160, answer.user.firstName + " " + answer.user.lastName, getColor())} alt='profile-pic' className='avatar w-10' />
						</div>

						<div className="flex flex-col flex-grow mb-4">
							<div className="flex flex-row items-center justify-between">
								<span className="text-purple-600">{answer.user.firstName + " " + answer.user.lastName}</span>
								<div className="relative">
									{answer.user._id === userData._id && (
										<AiOutlineEllipsis
											className="h-6 w-6 text-gray-500 cursor-pointer ml-2"
											onClick={() => toggleDropdown(index)}
										/>
									)}
									{openDropdownIndex === index && (
										<div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10">
											<button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleEditOption(answer, index)}>
												Edit
											</button>
											<button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleDeleteOption(answer._id)}>
												Delete
											</button>
										</div>
									)}
								</div>
							</div>
							<p className="text-gray-500 mb-1 text-xs">{getTimeAgo(new Date(answer.createdAt))}</p>

							{editingIndex === index ? (
								<div>
									<ReactQuill theme="snow" onChange={setNewAnswer} style={{ height: "200px", marginBottom: "50px" }} value={newAnswer} />
									<div className="flex gap-3">
										<CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Edit" callBack={() => handleEditRequest(answer._id)} />
										<CustomButton text="Cancel" callBack={() => setEditingIndex(null)} />
									</div>
								</div>

							) : (
								<div className="flex flex-col my-2 text-md">
									<p dangerouslySetInnerHTML={{ __html: answer.content }} />
								</div>
							)}


						</div>
					</div>
				))}
				{answers.length > 5 && (
					<div className="mt-2 mb-4 text-purple-500 cursor-pointer border-[1px] font-bold border-black py-2 hover:bg-gray-300" onClick={toggleShowMoreAnswers}>
						{showMoreAnswers ? (
							<div className="flex flex-row  justify-center items-center gap-1"><p>Show less</p> <MdKeyboardArrowUp size={20} /></div>
						) : (
							<div className="flex flex-row  justify-center items-center gap-1">Show more <MdKeyboardArrowDown size={20} /></div>
						)}
					</div>
				)}
				<div className="mt-4">
					{isReplying === true ? (
						<div>
							<ReactQuill theme="snow" onChange={setNewAnswer} style={{ height: "200px", marginBottom: "50px" }} />
							<div className="flex gap-3">
								<CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Send" callBack={handleSendingAnswer} />
								<CustomButton text="Cancel" callBack={() => setIsReplying(false)} />
							</div>
						</div>
					) : (
						<CustomButton icon={null} text="Add a reply" callBack={() => setIsReplying(true)} />
					)}
				</div>

			</div >
			<WarningModal
				isOpen={showDeleteModal}
				onCancel={handleCancelDelete}
				onConfirm={handleConfirmDelete}
			/>
		</div >
	)
}

export default AnsComp;


export const CustomButton = ({ icon, text, callBack }) => {
	return (
		<button id="edit" className="flex bg-black text-sm hover:opacity-50 min-w-24 max-w-48 justify-center items-center p-2" onClick={callBack}>
			{icon}
			<p className="font-bold text-white mx-1">{text}</p>
		</button>
	)
}