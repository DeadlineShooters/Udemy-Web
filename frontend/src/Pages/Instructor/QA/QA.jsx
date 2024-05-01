import React, { useEffect, useState } from "react";
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import { getColor, createImageFromInitials } from '../../../Components/Utils/Utils';
import ReactQuill from 'react-quill';
import { AiOutlineEllipsis } from 'react-icons/ai';
import 'react-quill/dist/quill.snow.css';

const fetchedCourses = [
    {
        id: '0',
        name: "The Complete 2024 Software Testing Bootcamp",
        instructor: {
            firstName: "Joe",
            lastName: "Thompson",
        },
        thumbnail: {
            publicURL: "",
        }
    }, {
        id: '1',
        name: "Elasticsearch: Complete Guide (2024)",
        instructor: {
            firstName: "Joe",
            lastName: "Thompson",
        },
        thumbnail: {
            publicURL: "",
        }
    }, {
        id: '2',
        name: "Elasticsearch: Complete Guide (2024)",
        instructor: {
            firstName: "Joe",
            lastName: "Thompson",
        },
        thumbnail: {
            publicURL: "",
        }
    },]

const personWhoAsked = {
    firstName: "Thong",
    lastName: "Nguyen"
}

const personWhoAnswered = {
    firstName: "Kiet",
    lastName: "Nguyen"
}

const answers = [{
    id: '01',
    user: personWhoAnswered,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed augue est. Curabitur ornare ac diam imperdiet ultrices. Donec sed turpis urna. Cras commodo aliquet vestibulum. Etiam sollicitudin placerat massa id feugiat. In ex tellus, hendrerit et mi eu, aliquam mattis elit. Nulla ut tellus vel sem venenatis feugiat. Donec sodales orci leo, eu cursus ante pretium ut. Mauris dignissim id ipsum id varius. Morbi enim libero, faucibus eu tincidunt sed, vehicula sit amet nisi. In dapibus vitae turpis nec varius.",
    createdAt: "2024-04-05",
}, {
    id: '02',
    user: personWhoAnswered,
    content: "Elasticsearch is the distributed search and analytics engine at the heart of the Elastic Stack. Logstash and Beats facilitate collecting, aggregating, and enriching your data and storing it in Elasticsearch. Kibana enables you to interactively explore, visualize, and share insights into your data and manage and monitor the stack. Elasticsearch is where the indexing, search, and analysis magic happens. Elasticsearch provides near real-time search and analytics for all types of data. Whether you have structured or unstructured text, numerical data, or geospatial data, Elasticsearch can efficiently store and index it in a way that supports fast searches. You can go far beyond simple data retrieval and aggregate information to discover trends and patterns in your data. And as your data and query volume grows, the distributed nature of Elasticsearch enables your deployment to grow seamlessly right along with it.",
    createdAt: "2024-04-05",
}]

// Dummy data
const qs = [
    {
        id: "0",
        user: personWhoAsked,
        course: fetchedCourses[0],
        title: "What did Caesar have to say about the constitution?",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed augue est. Curabitur ornare ac diam imperdiet ultrices. Donec sed turpis urna. Cras commodo aliquet vestibulum. Etiam sollicitudin placerat massa id feugiat. In ex tellus, hendrerit et mi eu, aliquam mattis elit. Nulla ut tellus vel sem venenatis feugiat. Donec sodales orci leo, eu cursus ante pretium ut. Mauris dignissim id ipsum id varius. Morbi enim libero, faucibus eu tincidunt sed, vehicula sit amet nisi. In dapibus vitae turpis nec varius. Curabitur leo diam, sodales non gravida eget, congue non dui. Suspendisse nec nunc tortor. Suspendisse sit amet metus nec augue elementum suscipit. Praesent ac fringilla lectus. Vivamus ante nisl, condimentum semper lorem et, luctus ornare ligula. Duis vitae lectus quis metus pellentesque tempus. Nullam lacus neque, dapibus finibus feugiat id, sagittis at mi. Ut id tincidunt dui. Aliquam nec maximus ipsum. Proin fringilla metus sed ex lacinia dapibus.",
        answers: answers,
        createdAt: "2024-04-05",
    },
    {
        id: "1",
        user: personWhoAsked,
        course: fetchedCourses[1],
        title: "What is Elasticsearch?",
        description: "adfadfasdf",
        answers: answers,
        createdAt: "2024-04-05",
    },
    {
        id: "2",
        user: personWhoAsked,
        course: fetchedCourses[1],
        title: "What are the advantages of Elasticsearch?",
        description: "",
        answers: answers,
        createdAt: "2024-04-05",
    },
];


const QAList = []

const QuestionAndAnswer = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const [editingIndex, setEditingIndex] = useState(null);

    const [isReplying, setIsReplying] = useState(false);


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
        const response = fetchedCourses;

        setCourses(fetchedCourses)
    }, []);

    useEffect(() => {
        if (selectedCourseId == null) return;
        // const questionList = q;
        const questionList = qs.filter(a => a.course.id == selectedCourseId)// TODO: replace this
        setQuestions(questionList)
        setSelectedQuestion(questionList[0])

    }, [selectedCourseId])




    const handleEdit = (answerId, index) => {
        // Implement your edit logic here
        console.log('Editing answer:', answerId);
        setEditingIndex(index);
        setOpenDropdownIndex(null); // Close dropdown after selecting edit
    };

    const handleDelete = (answerId, index) => {
        // Implement your delete logic here
        console.log('Deleting answer:', answerId);
        setEditingIndex(index);
        setOpenDropdownIndex(null); // Close dropdown after selecting delete
    };

    const toggleDropdown = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const [value, setValue] = useState("");
    // const [oneQA, setOneQA] = useState(QAList[0]);
    const [edit, setEdit] = useState(false);

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
                                <option key={index} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-end filter-container pb-3">
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
                </div>
                <div className="flex mt-4 relative items-end mb-8">
                    <span>Sort by:</span>
                    <div className="flex flex-col filter-container mr-8">
                        <select className="text-md font-bold hover:bg-gray-200">
                            <option value="all" selected>Newest first</option>
                            <option value="all" selected>Oldest first</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-grow flex-row mt-3 h-[1500px] border border-black">
                    <div className="border-r border-black w-[400px] h-full flex flex-col">
                        <div className="flex justify-between border-black border-b-[1px]">
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by keyword"
                                required
                            />
                            <button className="p-2 border-black border-l-[1px]"><IconSearch stroke={2} color="#3d07bb" /></button>
                        </div>
                        <div className="overflow-y-auto flex-grow">
                            {selectedCourseId && questions.map((question) => (
                                <div key={question.id} onClick={() => { }}>
                                    <div className={`${question.id == selectedQuestion?.id ? "bg-gray-300" : ""} flex flex-row py-2 border-gray-600 border-b-[1px] hover:cursor-pointer hover:bg-gray-200`} onClick={() => handleSelectingQuestion(question)}>
                                        <div className="mx-2 w-[40px]">
                                            <img id='preview' src={createImageFromInitials(160, question.user.firstName + " " + question.user.lastName, getColor())} alt='profile-pic' className='avatar' />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-[320px]">
                                                <p className="line-clamp-2 leading-tight">{question.title}</p>
                                            </div>
                                            <div className="flex flex-row">
                                                <p className="font-bold mr-2">{question.user.firstName + " " + question.user.lastName}</p>
                                                <p>2 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedQuestion && (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex p-5 bg-gray-200 border-b border-black">
                                <div className="w-[50px]">
                                    <img id='preview' src={createImageFromInitials(160, selectedQuestion.user.firstName + " " + selectedQuestion.user.lastName, getColor())} alt='profile-pic' className='avatar w-10' />
                                </div>
                                <div className="flex flex-col w-[720px]">
                                    <div className="flex flex-row">
                                        <p className="text-[#3d07bb] mr-2">{selectedQuestion.user.firstName + " " + selectedQuestion.user.lastName}</p>
                                        <p className="mr-2">2 days ago</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold line-clamp-2 leading-tight">{selectedQuestion.title}</p>
                                        <p>{selectedQuestion.description}</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-bold text-lg p-3 shadow-md">{selectedQuestion.answers.length} replies</h2>
                            <div className="p-2 overflow-y-auto flex-grow flex flex-col">
                                {selectedQuestion.answers && selectedQuestion.answers.map((answer, index) => (
                                    <div className="flex flex-row ml-3">
                                        <div className="w-[50px]">
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
                                                    {openDropdownIndex === index && (
                                                        <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10">
                                                            <button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleEdit(answer.id, index)}>
                                                                Edit
                                                            </button>
                                                            <button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleDelete(answer.id, index)}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 mb-1">2 days ago</p>

                                            {editingIndex === index ? (
                                                <div>
                                                    <ReactQuill theme="snow" onChange={setValue} style={{ height: "200px", marginBottom: "50px" }} value={answer.content} />
                                                    <div className="flex gap-3">
                                                        <CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Edit" callBack={() => setIsReplying(true)} />
                                                        <CustomButton text="Cancel" callBack={() => setEditingIndex(null)} />
                                                    </div>
                                                </div>

                                            ) : (
                                                <div className="flex flex-col my-2">
                                                    <p>{answer.content}</p>
                                                </div>
                                            )}


                                        </div>
                                    </div>
                                ))}
                                <div className="ml-3 mt-auto">
                                    {isReplying === true ? (
                                        <div>
                                            <ReactQuill theme="snow" onChange={setValue} style={{ height: "200px", marginBottom: "50px" }} />
                                            <div className="flex gap-3">
                                                <CustomButton icon={<IconSend2 stroke={2} color="white" />} text="Edit" callBack={() => setIsReplying(true)} />
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


{/* {selectedQuestion.answers.length === 0 || edit === true ? (
                                    <div>
                                        <ReactQuill theme="snow" value={selectedQuestion.answers.length === 0 ? value : selectedQuestion.answers} onChange={setValue} style={{ height: "200px", marginBottom: "50px" }} />
                                        <button className="flex flex-row bg-black rounded-lg w-24 p-1 justify-center mt-2">
                                            <IconSend2 stroke={2} color="white" />
                                            <p className="font-bold text-white mx-1">Send</p>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>{selectedQuestion.answers}</p>
                                        <button id="edit" className="flex flex-row bg-black rounded-lg w-24 p-1 justify-center mt-2" onClick={() => setEdit(true)}>
                                            <IconSend2 stroke={2} color="white" />
                                            <p className="font-bold text-white mx-1">Edit</p>
                                        </button>
                                    </div>
                                )} */}




// useEffect(() => {
//     if (!questions && questions.length < 1) return;
//     console.dir(questions[0])
//     setSelectedQuestion(questions[0]);
// }, [questions])


// const [value, setValue] = useState("");
// const [oneQA, setOneQA] = useState(QAList[0]);
// const [edit, setEdit] = useState(false);
// const getQA = (id) => {
//     toggleSelectQA(id)
//     const selectedQA = QAList.find(qa => qa.id === id);
//     if (selectedQA) {
//         turnOffEdit();
//         setOneQA(selectedQA);
//     }
// };
// const [filterValue, setFilterValue] = useState("all"); // State to hold selected option value
// const handleSelectChange = (event) => {
//     setFilterValue(event.target.value); // Update state with selected option value
//     filterItems(filterValue);
// };
// const courseFilter = [...new Set(QAList.map(QA => QA.course.name))];
// const [QAWithSelectedCourse, setQAWithSelectedCourse] = useState([]);
// const filterItems = () => {
//     if (filterValue === "all") {
//         setQAWithSelectedCourse(QAList); // If "All courses" selected, set all QAs
//     } else {
//         const filteredQA = QAList.filter(qa => qa.course.name === filterValue);
//         setQAWithSelectedCourse(filteredQA);
//     }
// };
// const turnOffEdit = () => {
//     setEdit(false);
//     setValue("");
// }
// const turnOnEdit = () => {
//     setEdit(true);
// }
// useEffect(() => {
//     filterItems();
// }, [filterValue]);
// // Toggle QA
// // 1: Get the QA Id stored in local
// const initialSelectQA = JSON.parse(localStorage.getItem("selectQA")) || {};
// // 2: Assign the Id to selectQA
// const [selectQA, setSelectQA] = useState(initialSelectQA);
// // 3: Handle QA select: by replace the chosen QA id  with the new one
// const toggleSelectQA = (Id_QA) => {
//     setSelectQA((prevState) => ({
//         [Id_QA]: !prevState[Id_QA],
//     }));
// };
// // 4: Store the QA id when have change in QA id
// useEffect(() => {
//     localStorage.setItem("selectQA", JSON.stringify(selectQA));
// }, [selectQA]);