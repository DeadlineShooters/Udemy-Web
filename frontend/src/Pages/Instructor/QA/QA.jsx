import React, { useEffect, useState } from "react";
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import { getColor, createImageFromInitials } from '../../../Components/Utils/Utils';
import ReactQuill from 'react-quill';
import { AiOutlineEllipsis } from 'react-icons/ai';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import getTimeAgo from "../../../helper/TimeAgo";
import { useAuth } from "../../../AuthContextProvider";
import WarningModal from "./WarningModal";


const QuestionAndAnswer = () => {
    const { userData } = useAuth();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [answers, setAnswers] = useState([]);

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const [editingIndex, setEditingIndex] = useState(null);

    const [isReplying, setIsReplying] = useState(false);

    const [newAnswer, setNewAnswer] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [selectedAnswerIdToDelete, setSelectedAnswerIdToDelete] = useState(null);

    const [sortOldest, setSortOldest] = useState(false);




    const handleSelectingCourse = (event) => {
        setSelectedCourseId(event.target.value); // Update state with selected option value
    };

    const handleSelectingQuestion = (question) => {
        setSelectedQuestion(question); // Update state with selected option value
        setDefaultValues();
    };

    const setDefaultValues = () => {
        setOpenDropdownIndex(null);
        setEditingIndex(null);
        setIsReplying(null);
    }


    useEffect(() => {

        // TODO: Call real api
        const getCourses = async () => {
            const res = await axios.get('http://localhost:5000/courses')
            // console.log(res)
            setCourses(res.data.courses)

        }
        getCourses();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedCourseId) return;

            try {
                // Define the sort order based on the state
                const sortOrder = sortOldest ? "asc" : "desc";

                // Construct the URL with the sort order query parameter
                const res = await axios.get(`http://localhost:5000/questions/${selectedCourseId}?sort=${sortOrder}`);
                const resQuestions = res.data;
                setQuestions(resQuestions);
                setSelectedQuestion(resQuestions[0]); // Update the selected question with the first question from the response
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchData(); // Call the async function
    }, [selectedCourseId, sortOldest]);


    const getAnswers = async () => {
        if (!selectedQuestion) return;

        try {
            const res = await axios.get(`http://localhost:5000/questions/${selectedQuestion._id}/answers`);
            const resAnswers = res.data;
            setAnswers(resAnswers);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };
    useEffect(() => {

        getAnswers(); // Call the async function
    }, [selectedQuestion]);


    const handleEditOption = (answer, index) => {
        // Implement your edit logic here
        console.log('Editing answer:', answer._id);
        setNewAnswer(answer.content);
        setEditingIndex(index);
        setOpenDropdownIndex(null); // Close dropdown after selecting edit
    };

    const toggleDropdown = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleSendingAnswer = async () => {
        const addAnswer = async (answer) => {
            try {
                let config = {
                    headers: {
                        user_id: userData._id,
                    }
                }
                const res = await axios.post(`http://localhost:5000/questions/${selectedQuestion._id}/answers`, answer, config);
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


    const handleEditRequest = async (editedAnswerId) => {
        try {

            // Define editAnswer as an asynchronous function
            const editAnswer = async (answer) => {
                const res = await axios.put(`http://localhost:5000/questions/${selectedQuestion._id}/answers/${editedAnswerId}`, answer);
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
                const res = await axios.delete(`http://localhost:5000/questions/${selectedQuestion._id}/answers/${answerId}`);
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

    const [showMoreAnswers, setShowMoreAnswers] = useState(false);

    // Logic to toggle show more answers
    const toggleShowMoreAnswers = () => {
        setShowMoreAnswers(!showMoreAnswers);
    };

    const [showMoreQuestions, setShowMoreQuestions] = useState(false);

    // Logic to toggle show more questions
    const toggleShowMoreQuestions = () => {
        setShowMoreQuestions(!showMoreQuestions);
    };


    return (
        <div className="flex w-full">
            <div className="md:w-16 h-screen"></div>
            <div className="container mx-auto p-6 py-12 lg:px-12">
                <div className="flex mt-4 relative items-end mb-8">
                    <h1 className="text-4xl font-bold text-black mr-8">Q&A</h1>
                    <div className="flex flex-col filter-container">
                        <select className="text-xl font-bold hover:bg-gray-200 border-2 border-black p-1 rounded-md" onChange={handleSelectingCourse}>
                            <option value="" disabled selected hidden>Choose a course</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course._id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* <div className="flex items-end filter-container pb-3">
                    <div className="flex items-center mr-8">
                        <input type="checkbox" id="notResponded" className="mr-2" />
                        <label htmlFor="notResponded">Unread</label>
                    </div>

                    <div className="flex items-center mr-8">
                        <input type="checkbox" id="noTopAnswer" className="mr-2" />
                        <label htmlFor="noTopAnswer">No top answer</label>
                    </div>

                    <div className="flex items-center mr-8">
                        <input type="checkbox" id="alreadyResponded" className="mr-2" />
                        <label htmlFor="alreadyResponded">No answer</label>
                    </div>
                </div> */}
                <div className="flex mt-4 relative items-end mb-8">
                    <span>Sort by:</span>
                    <div className="flex flex-col filter-container mr-8">
                        <select
                            className="text-md font-bold hover:bg-gray-200"
                            onChange={(e) => setSortOldest(e.target.value === 'oldest')}
                        >
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-grow flex-row mt-3 h-[1000px] border border-black">
                    <div className="border-r border-black w-[400px] h-full flex flex-col">
                        {/* <div className="flex justify-between border-black border-b border-r">
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by keyword"
                                required
                            />
                            <button className="p-2 border-black border-l-[1px]"><IconSearch stroke={2} color="#3d07bb" /></button>
                        </div> */}
                        <div className="overflow-y-auto flex-grow">
                            {selectedCourseId && questions.slice(0, showMoreQuestions ? questions.length : 5).map((question) => (
                                <div key={question._id} onClick={() => { }}>
                                    <div className={`${question._id == selectedQuestion?._id ? "bg-gray-300" : ""} flex flex-row py-2 border-gray-600 border-b-[1px] hover:cursor-pointer hover:bg-gray-200`} onClick={() => handleSelectingQuestion(question)}>
                                        <div className="mx-2 w-[40px] min-w-[40px]">
                                            <img id='preview' src={createImageFromInitials(160, question.user.firstName + " " + question.user.lastName, getColor())} alt='profile-pic' className='avatar' />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-[320px]">
                                                <p className="line-clamp-2 leading-tight">{question.title}</p>
                                            </div>
                                            <div className="flex flex-row">
                                                <p className="font-bold mr-2">{question.user.firstName + " " + question.user.lastName}</p>
                                                <p>{getTimeAgo(new Date(question.createdAt))}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {questions.length > 5 && (
                                <div className="mt-2 mb-4 text-purple-500 cursor-pointer text-center" onClick={toggleShowMoreQuestions}>
                                    {showMoreQuestions ? 'Show less' : 'Show more'}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedQuestion && (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex p-5 bg-gray-200 border-b border-black">
                                <div className="w-[50px] min-w-[50px]">
                                    <img id='preview' src={createImageFromInitials(160, selectedQuestion.user.firstName + " " + selectedQuestion.user.lastName, getColor())} alt='profile-pic' className='avatar w-10' />
                                </div>
                                <div className="flex flex-col w-[720px]">
                                    <div className="flex flex-row">
                                        <p className="text-[#3d07bb] mr-2">{selectedQuestion.user.firstName + " " + selectedQuestion.user.lastName}</p>
                                        <p className="mr-2">{getTimeAgo(new Date(selectedQuestion.createdAt))}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold line-clamp-2 leading-tight">{selectedQuestion.title}</p>
                                        <p>{selectedQuestion.description}</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-bold text-lg p-3 shadow-md">{answers.length} replies</h2>
                            <div className="p-2 overflow-y-auto flex-grow flex flex-col">
                                {answers && answers.slice(0, showMoreAnswers ? answers.length : 5).map((answer, index) => (
                                    <div className="flex flex-row ml-3">
                                        <div className="w-[50px] min-w-[50px]">
                                            <img id='preview' src={createImageFromInitials(160, answer.user.firstName + " " + answer.user.lastName, getColor())} alt='profile-pic' className='avatar w-10' />
                                        </div>
                                        <div className="flex flex-col w-[720px] mb-4">
                                            <div className="flex flex-row items-center justify-between">
                                                <span className="text-[#3d07bb]">{answer.user.firstName + " " + answer.user.lastName}</span>
                                                <div className="relative">
                                                    <AiOutlineEllipsis
                                                        className="h-6 w-6 text-gray-500 cursor-pointer ml-2"
                                                        onClick={() => toggleDropdown(index)}
                                                    />
                                                    {answer.user._id === userData._id && openDropdownIndex === index && (
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
                                            <p className="text-gray-500 mb-1">{getTimeAgo(new Date(answer.createdAt))}</p>

                                            {editingIndex === index ? (
                                                <div>
                                                    <ReactQuill theme="snow" onChange={setNewAnswer} style={{ height: "200px", marginBottom: "50px" }} value={newAnswer} />
                                                    <div className="flex gap-3">
                                                        <CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Edit" callBack={() => handleEditRequest(answer._id)} />
                                                        <CustomButton text="Cancel" callBack={() => setEditingIndex(null)} />
                                                    </div>
                                                </div>

                                            ) : (
                                                <div className="flex flex-col my-2">
                                                    <p dangerouslySetInnerHTML={{ __html: answer.content }} />
                                                </div>
                                            )}


                                        </div>
                                    </div>
                                ))}
                                {answers.length > 5 && (
                                    <div className="mt-2 mb-4 text-purple-500 cursor-pointer text-center" onClick={toggleShowMoreAnswers}>
                                        {showMoreAnswers ? 'Show less' : 'Show more'}
                                    </div>
                                )}
                                <div className="ml-3">
                                    {isReplying === true ? (
                                        <div>
                                            <ReactQuill theme="snow" onChange={setNewAnswer} style={{ height: "200px", marginBottom: "50px" }} />
                                            <div className="flex gap-3">
                                                <CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Send" callBack={handleSendingAnswer} />
                                                <CustomButton text="Cancel" callBack={() => setIsReplying(false)} />
                                            </div>
                                        </div>
                                    ) : (
                                        <CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Add a reply" callBack={() => setIsReplying(true)} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <WarningModal
                isOpen={showDeleteModal}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default QuestionAndAnswer;


export const CustomButton = ({ icon, text, callBack }) => {
    return (
        <button id="edit" className="flex bg-black text-sm hover:opacity-50 min-w-24 max-w-36 p-1 justify-center items-center" onClick={callBack}>
            {icon}
            <p className="font-bold text-white mx-1">{text}</p>
        </button>
    )
}