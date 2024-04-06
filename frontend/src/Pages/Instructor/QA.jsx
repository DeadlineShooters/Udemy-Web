import React, { useEffect, useState } from "react";
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import { getColor, createImageFromInitials } from '../../Components/Utils/Utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Dummy data
const QAList = [
    {
        id: "0",
        user: {
            firstName: "Nguyen Minh",
            lastName: "Thong"
        },
        course: {
            name: "The Complete 2024 Software Testing Bootcamp",
            instructor: {
                firstName: "Joe",
                lastName: "Thompson",
            },
            thumbnail: {
                publicURL: "",
            }
        },
        title: "What did Caesar have to say about the constitution?",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed augue est. Curabitur ornare ac diam imperdiet ultrices. Donec sed turpis urna. Cras commodo aliquet vestibulum. Etiam sollicitudin placerat massa id feugiat. In ex tellus, hendrerit et mi eu, aliquam mattis elit. Nulla ut tellus vel sem venenatis feugiat. Donec sodales orci leo, eu cursus ante pretium ut. Mauris dignissim id ipsum id varius. Morbi enim libero, faucibus eu tincidunt sed, vehicula sit amet nisi. In dapibus vitae turpis nec varius. Curabitur leo diam, sodales non gravida eget, congue non dui. Suspendisse nec nunc tortor. Suspendisse sit amet metus nec augue elementum suscipit. Praesent ac fringilla lectus. Vivamus ante nisl, condimentum semper lorem et, luctus ornare ligula. Duis vitae lectus quis metus pellentesque tempus. Nullam lacus neque, dapibus finibus feugiat id, sagittis at mi. Ut id tincidunt dui. Aliquam nec maximus ipsum. Proin fringilla metus sed ex lacinia dapibus.",
        answer: "",
        createdTime: "2024-04-05",
    },
    {
        id: "1",
        user: {
            firstName: "Tomato",
            lastName: "09"
        },
        course: {
            name: "Elasticsearch: Complete Guide (2024)",
            instructor: {
                firstName: "Joe",
                lastName: "Thompson",
            },
            thumbnail: {
                publicURL: "",
            }
        },
        title: "What is Elasticsearch?",
        description: "",
        answer: "Elasticsearch is the distributed search and analytics engine at the heart of the Elastic Stack. Logstash and Beats facilitate collecting, aggregating, and enriching your data and storing it in Elasticsearch. Kibana enables you to interactively explore, visualize, and share insights into your data and manage and monitor the stack. Elasticsearch is where the indexing, search, and analysis magic happens. Elasticsearch provides near real-time search and analytics for all types of data. Whether you have structured or unstructured text, numerical data, or geospatial data, Elasticsearch can efficiently store and index it in a way that supports fast searches. You can go far beyond simple data retrieval and aggregate information to discover trends and patterns in your data. And as your data and query volume grows, the distributed nature of Elasticsearch enables your deployment to grow seamlessly right along with it.",
        createdTime: "2024-04-05",
    },
    {
        id: "2",
        user: {
            firstName: "HCMUS",
            lastName: "Student"
        },
        course: {
            name: "Elasticsearch: Complete Guide (2024)",
            instructor: {
                firstName: "Joe",
                lastName: "Thompson",
            },
            thumbnail: {
                publicURL: "",
            }
        },
        title: "What are the advantages of Elasticsearch?",
        description: "",
        answer: "Elasticsearch is the distributed search and analytics engine at the heart of the Elastic Stack. Logstash and Beats facilitate collecting, aggregating, and enriching your data and storing it in Elasticsearch. Kibana enables you to interactively explore, visualize, and share insights into your data and manage and monitor the stack. Elasticsearch is where the indexing, search, and analysis magic happens. Elasticsearch provides near real-time search and analytics for all types of data. Whether you have structured or unstructured text, numerical data, or geospatial data, Elasticsearch can efficiently store and index it in a way that supports fast searches. You can go far beyond simple data retrieval and aggregate information to discover trends and patterns in your data. And as your data and query volume grows, the distributed nature of Elasticsearch enables your deployment to grow seamlessly right along with it.",
        createdTime: "2024-04-05",
    },
];

const QuestionAndAnswer = () => {
    const [value, setValue] = useState("");
    const [oneQA, setOneQA] = useState(QAList[0]);
    const [edit, setEdit] = useState(false);
    const getQA = (id) => {
        const selectedQA = QAList.find(qa => qa.id === id);
        if (selectedQA) {
            turnOffEdit();
            setOneQA(selectedQA);
        }
    };
    const [filterValue, setFilterValue] = useState("all"); // State to hold selected option value
    const handleSelectChange = (event) => {
        setFilterValue(event.target.value); // Update state with selected option value
        filterItems(filterValue);
    };
    const courseFilter = [...new Set(QAList.map(QA => QA.course.name))];
    const [QAWithSelectedCourse, setQAWithSelectedCourse] = useState([]);
    const filterItems = () => {
        if (filterValue === "all") {
            setQAWithSelectedCourse(QAList); // If "All courses" selected, set all QAs
        } else {
            const filteredQA = QAList.filter(qa => qa.course.name === filterValue);
            setQAWithSelectedCourse(filteredQA);
        }
    };
    const turnOffEdit = () => {
        setEdit(false);
        setValue("");
    }
    const turnOnEdit = () => {
        setEdit(true);
    }
    useEffect(() => {
        filterItems();
    }, [filterValue]);
    return (
    <div className="flex w-full">
        <div className="md:w-16 h-screen"></div>
            <div className="container mx-auto p-6 py-12 lg:px-12">
                <div className="flex mt-4 relative items-end mb-8">
                    <h1 className="text-4xl font-bold text-black mr-8">Q&A</h1>
                    <div className="flex flex-col filter-container mr-8">
                        <select className="text-xl font-bold hover:bg-gray-200" onChange={handleSelectChange} value={filterValue}>
                            <option value="all" >All courses</option>
                            {courseFilter.map((course, index) => (
                                <option key={index} value={course}>{course}</option>
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
                        <input type="checkbox" id="alreadyResponded" className="mr-2" />
                        <label htmlFor="alreadyResponded">No top answer</label>
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
            <div className="flex flex-grow flex-row mt-3 ">
                <div className="border border-black w-[400px]">
                    <div className="flex justify-between border-black border-b-[1px] ">
                        <input type="search" id="default-search" className="block w-full p-2 text-sm text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by keyword" required />
                        <button className="p-2 border-black border-l-[1px]"><IconSearch stroke={2} color="#3d07bb" /></button>
                    </div>
                    {QAWithSelectedCourse.map((oneQAInTab) => (
                        <div key={oneQAInTab.id} onClick={()=> getQA(oneQAInTab.id)}>
                            <div className="flex flex-row py-2 border-gray-600 border-b-[1px] bg-gray-100 hover:cursor-pointer">
                                <div className="mx-2 w-[40px]">
                                    <img id='preview' src={createImageFromInitials(160, oneQAInTab.user.firstName + " " + oneQAInTab.user.lastName, getColor())} alt='profile-pic' className='avatar' />
                                </div>
                                <div className="flex flex-col">
                                    <div className="w-[320px]">
                                        <p className="line-clamp-2 leading-tight">{oneQAInTab.title}</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <p className="font-bold mr-2">{oneQAInTab.user.firstName + " " + oneQAInTab.user.lastName}</p>
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border border-black border-l-0 w-[800px]">
                    <div className="flex flex-row p-5">
                        <div className="w-[50px]">
                            <img id='preview' src={createImageFromInitials(160, oneQA.user.firstName + " " + oneQA.user.lastName, getColor())} alt='profile-pic' className='avatar w-10' />
                        </div>
                        <div className="flex flex-col w-[720px]">
                            <div className="flex flex-row">
                                <p className="text-[#3d07bb] mr-2">{oneQA.user.firstName + " " + oneQA.user.lastName}</p>
                                <p className="mr-2">2 days ago</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold line-clamp-2 leading-tight">{oneQA.title}</p>
                                <p>{oneQA.description}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-black"/>
                    <div className="flex flex-col p-5 w-full">
                        {oneQA.answer.length === 0 || edit === true ? (
                            <div> 
                                <ReactQuill theme="snow" value={oneQA.answer.length === 0 ? value : oneQA.answer} onChange={setValue} style={{height:"200px", marginBottom: "50px"}} />
                                <button className="flex flex-row bg-black rounded-lg w-24 p-1 justify-center mt-2">
                                    <IconSend2 stroke={2} color="white"/>
                                    <p className="font-bold text-white mx-1">Send</p>
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>{oneQA.answer}</p>
                                <button id="edit" className="flex flex-row bg-black rounded-lg w-24 p-1 justify-center mt-2" onClick={() => setEdit(true)}>
                                    <IconSend2 stroke={2} color="white"/>
                                    <p className="font-bold text-white mx-1">Edit</p>
                                </button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuestionAndAnswer;