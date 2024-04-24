import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonDefault from "../../../Components/CourseFeedback/ButtonDefault";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconPlus, IconEdit, IconTrash, 
        IconCheck, IconAlertCircleFilled, IconClipboardText, 
        IconBrandYoutubeFilled, IconEye, IconCrop } from '@tabler/icons-react';
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";
import Modal from "../../../Components/CourseManagement/Modal";
import VideoModal from "../../../Components/CourseManagement/VideoModal";
import DynamicInput from "../../../Components/CourseManagement/DynamicInput";
import { Image, Video } from 'cloudinary-react';
import axios from 'axios';
import './CreateCourse.css';
import { useAuth } from '../../../AuthContextProvider.jsx';
import { useForm } from 'react-hook-form';

const Section = ({ sectionName, sectionId, lectures, onLectureCreate, onSectionUpdate, onLectureUpdate, onLectureDelete, onSectionDelete}) => {
  const [addLecture, setAddLecute] = useState(false);
  const [newLectureName, setNewLectureName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [secureURL, setSecureUrl] = useState();
  const [publicID, setPublicID] = useState();
  const [duration, setVideoDuration] = useState();

  const [editVideoName, setEditVideoName] = useState('');
  const [editSecureURL, setEditSecureURL] = useState();
  const [editpublicID, setEditPublicID] = useState();
  const [editDuration, setEditVideoDuration] = useState();

  const [error, updateError] = useState();
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [oldLectureName, setOldLectureName] = useState("");
  const [oldLectureVideo, setOldLectureVideo] = useState("");
  const [editLectureName, setEditLectureName] = useState("");
  const [deleteLectureData, setDeleteLectureData] = useState();

  const [showVideo, setShowVideo] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false); // State for section modal
  const [showLectureModal, setShowLectureModal] = useState(false); // State for lecture modal

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorVideo, setIsErrorVideo] = useState(false);
  const [isErrorUpdateName, setIsErrorUpdateName] = useState(false);
  const [isErrorUpdateVideo, setIsErrorUpdateVideo] = useState(false);

  const handleOnUpload = (error, result, widget, type) => {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result);
    if (type === "upload") {
      setIsErrorVideo(false);
      setVideoName(result?.info?.original_filename);
      setPublicID(result?.info?.public_id);
      setSecureUrl(result?.info?.secure_url);
      setVideoDuration(result?.info?.duration);
    }
    if (type === "update") {
      setIsErrorUpdateVideo(false);
      setEditVideoName(result?.info?.original_filename);
      setEditPublicID(result?.info?.public_id);
      setEditSecureURL(result?.info?.secure_url);
      setEditVideoDuration(result?.info?.duration);
    }
  }

  const toggleAddLecture = () => {
    setAddLecute(!addLecture)
  }

  const handleLectureNameChange = (e) => {
    setNewLectureName(e.target.value);
  };

  const handleCreateLecture = () => {
    if (newLectureName.trim() === '') {
      setIsErrorName(true);
    } else {
      setIsErrorName(false);
    }
    if (!secureURL) {
      setIsErrorVideo(true);
    } else {
      setIsErrorVideo(false);
    }
    if (newLectureName.trim() !== '' && secureURL) {
      onLectureCreate(sectionName, newLectureName, secureURL, publicID, duration, videoName);
      setAddLecute(!addLecture);

      setNewLectureName('');
      setSecureUrl();
      setPublicID();
      setVideoDuration();
      setVideoName();

      setIsErrorName(false);
      setIsErrorVideo(false);
    }
  };

  const [editSectionName, setEditSectionName] = useState(false);
  const [updatedSectionName, setUpdatedSectionName] = useState(sectionName);

  const handleSectionNameChange = (e) => {
    setUpdatedSectionName(e.target.value);
  };

  const handleUpdateSectionName = () => {
    setEditSectionName(false);
    if (updatedSectionName.trim() !== '') {
      onSectionUpdate(sectionId, updatedSectionName);
    }
  };

  const DeleteSelectVideo = () => {
    if (!isEditLecture) {
      setSecureUrl();
      setPublicID();
      setVideoName('');
      setVideoDuration();
    } else {
      setEditSecureURL();
      setEditPublicID();
      setEditVideoName('');
      setEditVideoDuration();
    }
    //Handle delete image from cloudinary
  }

  const EditLecture = (lecture) => {
    setIsEditLecture(!isEditLecture);
    setOldLectureName(lecture.name);
    setOldLectureVideo(lecture.video.secureURL);
    setEditLectureName(lecture.name);
    setEditSecureURL(lecture.video.secureURL);
    setEditVideoName(lecture.video.name);
    setEditPublicID(lecture.video.publicID);
    setEditVideoDuration(lecture.video.duration);
  }
  const handleEditLectureName = (e) => {
    setEditLectureName(e.target.value);
  };
  const handleUpdateLecture = () => {
    if (editLectureName.trim() === '') {
      setIsErrorUpdateName(true);
    } else {
      setIsErrorUpdateName(false);
    }
    if (!editSecureURL) {
      setIsErrorUpdateVideo(true);
    } else {
      setIsErrorUpdateVideo(false);
    }
    if (editLectureName.trim() !== '' && editSecureURL) {
      onLectureUpdate(sectionName, editLectureName, editSecureURL, editpublicID, editDuration, editVideoName, oldLectureName, oldLectureVideo);
      setIsEditLecture(false);
      setEditLectureName("");
      setEditSecureURL();
      setEditPublicID();
      setEditVideoName('');
      setEditVideoDuration();
      setIsErrorUpdateName(false);
      setIsErrorUpdateVideo(false);
    }
  }
  const deleteLecture = (lecture) => {
    setShowLectureModal(true);
    setDeleteLectureData(lecture);
  }
  const handleDeleteLecture = () => {
    onLectureDelete(sectionName, deleteLectureData.name, deleteLectureData.video);
    setShowLectureModal(false);
  }
  const handleDeleteSection = () => {
    onSectionDelete(sectionName);
    setShowSectionModal(false);
  }
  return (
    <div>
      <div className="flex flex-row my-5 items-center justify-between">
        <div className="flex flex-row items-center">
          {editSectionName ? 
          (
            <div className="flex flex-row w-full">
              <span className="text-xl font-bold mr-2">Section {sectionId + 1}.</span>
              <DynamicInput 
                defaultValue={sectionName} 
                onChange={handleSectionNameChange} 
                className="text-xl font-bold"
                maxLength={120}
              />
            </div>
          ) : 
          (
            <div>
              <p className="text-xl font-bold mr-2 w-full line-clamp-2">Section {sectionId + 1}. {sectionName}</p>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            {editSectionName ? 
            (
              <button className="flex flex-row bg-[#891db7] rounded-md p-1 px-2 mr-2" onClick={handleUpdateSectionName}>
                <IconCheck stroke={2} color="white" />
                <span className="text-white">Save</span>
              </button>
            ) 
            : 
            (
              <button className="flex flex-row bg-[#a9a9a9] rounded-md p-1 px-2 mr-2" onClick={() => setEditSectionName(true)}>
                <IconEdit stroke={2} color="white" />
                <span className="text-white">Rename</span>
              </button>
            )}
          </div>
          <button className="flex flex-row bg-black p-1 px-2 rounded-md mr-2" onClick={toggleAddLecture}>
            <IconPlus stroke={2} color="white"/>
            <p className="text-white">Add</p>
          </button>
          <div>
            <button id="section" className="bg-[#e95a5a] p-1 rounded-md" onClick={() => setShowSectionModal(true)}>
              <IconTrash stroke={2} color="white" />
            </button>
            <Modal 
              showModal={showSectionModal} 
              setShowModal={setShowSectionModal}
              title={"Delete section?"}
              type={"alert"}
              description={`By deleting section, every lecture inside can be also deleted. This process can not be recovered.`}
              handle={handleDeleteSection}
              action={"Delete"}/>
          </div>
        </div>
      </div>
      {addLecture && 
      <div>
        <Heading1>Create Your Lecture: </Heading1>
        <div className="flex justify-between border border-black p-3 mb-2">
          <div><IconClipboardText className="mr-2" /></div>
          <input 
            type="text" 
            placeholder="Input your lecture name" 
            maxLength={120} 
            value={newLectureName} 
            className="focus:outline-none focus:ring-0 w-full" 
            onChange={handleLectureNameChange}/>
          <span>{120 - newLectureName.length}</span>
        </div>
        {isErrorName && <div className="text-[#d44343] font-bold my-2">OOPS! You need to input the lecture's name</div>}
        {videoName ? <div className="flex justify-between border border-black p-3 mb-2 items-center">
          <div><IconBrandYoutubeFilled className="mr-2" /></div>
          <input 
            type="text"
            maxLength={120} 
            defaultValue={videoName} 
            className="focus:outline-none focus:ring-0 w-full" />
          <span className="flex flex-row">      
            <button 
              className="flex flex-row p-1 px-2 bg-[#241d6c] rounded-md mr-2" 
              onClick={() => setShowVideo(true)}>
                <IconEye stroke={2} color="white" className="mr-2"/>
                <p className="font-bold text-white">Preview</p>
            </button>
            <VideoModal 
              showVideoModal={showVideo} 
              setShowVideoModal={setShowVideo}
              VideoName={videoName}
              VideoSrc={secureURL}/>
            <button className="bg-[#e95a5a] p-1 rounded-md" onClick={DeleteSelectVideo}>
              <IconTrash stroke={2} color="white"/>
            </button>
          </span>
        </div> : <UploadWidget onUpload={handleOnUpload} type="upload" object="video"/>}
        {isErrorVideo && <div className="text-[#d44343] font-bold my-2">OOPS! You need to upload the lecture's video</div>}
        <Button 
          color="black" 
          className="rounded-none hover:bg-violet-800" 
          style={{height: "48px"}} 
          onClick={handleCreateLecture}>
          <span className="font-bold text-base normal-case">
            Add
          </span>
        </Button>
        <hr className="border-[1px] border-black my-5"/>
      </div>}
      {isEditLecture && 
      <div>
        <Heading1>Edit Your Lecture: </Heading1>
        <div className="flex justify-between border border-black p-3 mb-2">
          <div><IconClipboardText className="mr-2" /></div>
          <input 
            type="text" 
            placeholder="Input your lecture name" 
            maxLength={120} 
            value={editLectureName} 
            className="focus:outline-none focus:ring-0 w-full" 
            onChange={handleEditLectureName}/>
          <span>{120 - editLectureName.length}</span>
        </div>
        {isErrorUpdateName && <div className="text-[#d44343] font-bold my-2">OOPS! You need to input the lecture's name</div>}
        {editSecureURL ? <div className="flex justify-between border border-black p-3 mb-2 items-center">
          <div><IconBrandYoutubeFilled className="mr-2" /></div>
          <input 
            type="text"
            maxLength={120} 
            defaultValue={editVideoName} 
            className="focus:outline-none focus:ring-0 w-full"
            disabled/>
          <span className="flex flex-row">      
          <button 
              className="flex flex-row p-1 px-2 bg-[#241d6c] rounded-md mr-2" 
              onClick={() => setShowVideo(true)}>
                <IconEye stroke={2} color="white" className="mr-2"/>
                <p className="font-bold text-white">Preview</p>
            </button>
            <VideoModal 
              showVideoModal={showVideo} 
              setShowVideoModal={setShowVideo}
              VideoName={editVideoName}
              VideoSrc={editSecureURL}/>
            <button className="bg-[#e95a5a] p-1 rounded-md" onClick={DeleteSelectVideo}>
              <IconTrash stroke={2} color="white"/>
            </button>
          </span>
        </div> : <UploadWidget onUpload={handleOnUpload} type="update" object="video"/>}
        {isErrorUpdateVideo && <div className="text-[#d44343] font-bold my-2">OOPS! You need to upload the lecture's video</div>}
        <Button 
          color="black" 
          className="rounded-none hover:bg-violet-800" 
          style={{height: "48px"}} 
          onClick={handleUpdateLecture}>
          <span className="font-bold text-base normal-case">
            Save
          </span>
        </Button>
        <hr className="border-[1px] border-black my-5"/>
      </div>}
      {/* Render existing lectures here */}
      {lectures.length === 0 && 
      <div className={`${addLecture === true ? "hidden" : "" } flex flex-row my-10`}>
        <p className="flex flex-row text-lg mr-2 items-center">
          <IconAlertCircleFilled color="red" className="mr-2"/>
          Your section content is empty.
        </p>
        <p className="text-lg font-bold cursor-pointer hover:text-[#561251]" onClick={toggleAddLecture}>Add lecture now!</p>
      </div>}
      {lectures.map((lecture, index) => (
        <div key={index}>
          <div className="flex flex-row">
            <div className="flex justify-between border border-black p-3 w-full items-center">
              <div className="flex flex-row items-center">
                <div>
                  <IconBrandYoutubeFilled className="w-[40px] h-[40px] mr-2" color="#52214f"/>
                </div>
                <div className="flex flex-col">
                  <p className="flex w-full line-clamp-2">Lecture {index + 1}: {lecture.name}</p>
                  <button className="flex" onClick={()=>setShowVideo(true)}>
                    <p className="text-gray-600 text-sm">
                      Video: {lecture.video.name}
                    </p>
                  </button>
                  <VideoModal 
                    showVideoModal={showVideo} 
                    setShowVideoModal={setShowVideo}
                    VideoName={videoName}
                    VideoSrc={lecture.video.secureURL}/>
                </div>
              </div>            
              <div className="flex flex-row items-center">
                <button 
                  className="py-1 px-5 border border-black rounded-md mr-2"
                  onClick={() => EditLecture(lecture)}>
                    <p className="font-bold text-[#752f93]">Edit</p>
                </button>
                <div>
                  <button className="bg-[#e95a5a] p-1 rounded-md" onClick={() => {deleteLecture(lecture)}}>
                    <IconTrash stroke={2} color="white" />
                  </button>
                  <Modal 
                    showModal={showLectureModal} 
                    setShowModal={setShowLectureModal}
                    title={"Delete lecture?"}
                    type={"warning"}
                    description={`By deleting section, every lecture inside can be also deleted. This process can not be recovered.`}
                    handle={() => handleDeleteLecture()}
                    action={"Delete"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CreateCourse = () => {
  const {userData} = useAuth();
  const [savedCourse, setSavedCourse] = useState();
  useEffect(() => {
    const getSavedCourse = () => {
      const tempData = localStorage.getItem("tempCourseData");
      if (tempData) {
        setSavedCourse(JSON.parse(tempData));
      }
    }
    getSavedCourse();
  }, [])
  console.log(savedCourse);
  // const predefineData = {
  //   preTitle: savedData.title ? savedData.title : "",
  //   preIntroduction: savedData.introduction ? savedData.introduction : "",
  // }

  /* Fetch categories from the system */
  const [categories, setCategories] = useState();

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [courseCat, setCourseCat] = useState("");
  const [thumbNail, setThumbNail] = useState({ secureURL: '', publicID: '' });
  const [promoVideoLink, setPromoVideoLink] = useState();
  const [promoVideoId, setPromoVideoId] = useState();
  const [promoVideoDuration, setPromoVideoDuration] = useState();
  const [price, setPrice] = useState();
  const [sections, setSections] = useState([]);
  const [totalLength, setTotalLength] = useState();
  const [totalLecture, setTotalLecture] = useState();
  const [addSection, setAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  //Track any changes
  const [fieldChanged, setFieldChanged] = useState(false);
  const [showInformModal, setShowInformModal] = useState(false); // State for section modal


  useEffect(() => {
    const isFormChanged = title !== "" || introduction !== "" || description !== ""
      setFieldChanged(isFormChanged);
  }, [title, introduction, description, thumbNail, promoVideoLink, promoVideoId, promoVideoDuration, price, sections]);

  useEffect(() => {
		axios
			.get('http://localhost:5000/courses/categories')
			.then((response) => {
				if (response.data.success) {
					setCategories(response.data.categories);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

  const handleOnUploadThumbNail = (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setThumbNail(prevState => ({
      ...prevState, 
      publicID: result?.info?.public_id, 
      secureURL: result?.info?.secure_url
    }));
  }

  const deleteThumbNail = () => {
    setThumbNail({ secureURL: '', publicID: '' });
  }

  const handleOnUploadPromoVideo = (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setPromoVideoDuration(result?.info?.duration);
    setPromoVideoId(result?.info?.public_id);
    setPromoVideoLink(result?.info?.secure_url);
  }

  const deletePromoVideo = () => {
    setPromoVideoId();
    setPromoVideoLink();
    setPromoVideoDuration();
  }

  const quillRef = useRef(); // Create a ref
  useEffect(() => {
    if (quillRef.current != null) {
      quillRef.current.getEditor().root.dataset.placeholder = "Insert your course description";
    }
  }, []);

  const checkUpdateField = () => {
    if (fieldChanged) {
      setShowInformModal(true);
    }
    else {
      navigate("/instructor/courses");
    }
  }

  const navigate = useNavigate();

  const goToCourses = () => {
    navigate("/instructor/courses");
  };

  const onSave = () => {};

  const toggleAddSection = () => {
    setAddSection(!addSection);
  }

  const handleSectionNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleSectionCreate = () => {
    setAddSection(!addSection);
    if (newSectionName.trim() !== '') {
      setSections([...sections, { name: newSectionName, lectures: [] }]);
      setNewSectionName('');
    }
  };

  const handleLectureCreate = (sectionName, lectureName, lectureVideoLink, lectureVideoID, lectureVideoDuration, lectureVideoName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        return { 
          ...section, 
          lectures: [...section.lectures, { name: lectureName, video: {secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName}}] 
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleLectureUpdate = (sectionName, lectureName, lectureVideoLink, lectureVideoID, lectureVideoDuration, lectureVideoName, oldLectureName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        let updatedLectures = section.lectures;
        const lectureIndex = updatedLectures.findIndex(lecture => lecture.name === oldLectureName);
        updatedLectures[lectureIndex] = { name: lectureName, video: {secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName} };
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });
    setSections(updatedSections);
  }

  const handleLectureDelete = (sectionName, lectureName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        const updatedLectures = section.lectures.filter((lecture) => lecture.name !== lectureName);
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSectionUpdate = (sectionId, newSectionName) => {
    // Create a new copy of sections array
    const updatedSections = [...sections];

    // Update the name of the section with the given id
    updatedSections[sectionId].name = newSectionName;

    // Update the state
    setSections(updatedSections);
  };

  const handleSectionDelete = (sectionName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        // Clear lectures of the specified section
        return { ...section, lectures: [] };
      }
      return section;
    }).filter((section) => section.name !== sectionName); // Delete the specified section
    setSections(updatedSections);
  };

  const NumToTime = (num) => { 
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - (hours * 3600)) / 60);
    let seconds = Math.round((num - (hours * 3600) - (minutes * 60)));
    return hours.toString().padStart(2, '0') + ':' + 
           minutes.toString().padStart(2, '0') + ':' + 
           seconds.toString().padStart(2, '0');
  }

  useEffect(() => {
    const calculateCourseLength = () => {
      let totalLecture = 0;
      let totalLength = 0; // count duration in second
      sections.forEach((section) => {
        section.lectures.forEach((lecture) => {
          totalLecture += 1; // Add quantity of lecture of the section of the Course content
          totalLength += lecture.video.duration; // Add duration of each lecture to totalLength
          totalLength = Math.round(totalLength);
        });
      });
      setTotalLecture(totalLecture);
      setTotalLength(totalLength);
    };
    const saveTempData = () => {
      const data = {
        title: title, 
        introduction: introduction, 
        description: description, 
        thumbNail: thumbNail,
        promotionalVideo: {secureURL: promoVideoLink, publicURL: promoVideoId, duration: promoVideoDuration},
        price: price,
        sections: sections,
        totalSection: sections.length,
        totalLecture: totalLecture,
        totalLength: totalLength,
      };
      localStorage.setItem('tempCourseData', JSON.stringify(data));
    }
    calculateCourseLength();
    saveTempData();
  }, [title, introduction, description, thumbNail, promoVideoLink, promoVideoId, promoVideoDuration, price, sections]);

  const handleCreateCourse = async () => {
    const data = {
      category: courseCat,
      title: title, 
      introduction: introduction, 
      description: description, 
      thumbNail: thumbNail,
      promotionalVideo: {secureURL: promoVideoLink, publicURL: promoVideoId, duration: promoVideoDuration},
      price: price,
      sections: sections,
      totalSection: sections.length,
      totalLecture: totalLecture,
      totalLength: totalLength,
      instructor: userData.instructor,
    }
    console.log(data);
    // try { 
    //   const response = await axios.post("http://localhost:5000/instructor/create-course", {data})
    //   if (response.status === 200) {

    //     //After creating course, reset all field
    //     navigate("/instructor/courses", {replace: true});
    //     console.log(response.data); 
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <div>
      <header className="bg-gray-900 py-5 px-8 border-b border-gray-200 flex gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
            <button className="flex flex-row items-center" onClick={() => checkUpdateField()}>
              <FontAwesomeIcon icon={faChevronLeft} color="white" className="mr-4" />
              <span className="text-white hidden sm:block">Back to courses</span>
            </button>
            <Modal 
              showModal={showInformModal} 
              setShowModal={setShowInformModal}
              title={"Cancel Creating?"}
              type={"alert"}
              description={`You have some changes on the course creating draft. Any entered information will be deleted`}
              handle={goToCourses}
              action={"Go to Dashboard"}/>
        </div>
        <ButtonDefault text={"Save"} handleClick={onSave} />
      </header>
        <div className="mainContainer flex px-32 py-5 bg-gray-50">
          <main className="w-full shadow-xl bg-white">
            <DashboardHeaderTitle title={"Create Course"}>
              <p className="text-3xl font-bold text-[#af39d3]">Basic information</p>
              <p className="text-lg font-md text-[#7b7b7b]">Course landing page & Instructor profile</p>
              <div className="my-6 border-y-2">
                <div className="mt-6 "></div>
                <div className="form-group mb-5">
                  <Heading1>Course Category</Heading1>
                    <div className="container justify-between">
                      <div className="function">
                        <div className="flex flex-col">
                          <select className=" p-3 text-md border border-black" onChange={(e) => setCourseCat(e.target.value)}>
                            <option value="none" disabled selected>Choose a category</option>
                            {categories && 
                              categories.map((category, index) => {
                                return (
                                  <option key={index} value={category._id}>{category.name}</option>
                                )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course title</Heading1>
                    <div className="flex justify-between border border-black p-3">
                      <input 
                        type="text" 
                        placeholder="Input the course's title" 
                        maxLength={120} 
                        className="focus:outline-none focus:ring-0 w-full"
                        onChange={(e) => setTitle(e.target.value)}
                        required/>
                      <span>{120 - title.length}</span>
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course introduction</Heading1>
                    <div className="flex justify-between border border-black p-3">
                      <input 
                        type="text" 
                        placeholder="Input the course's introduction" 
                        maxLength={120} 
                        className="focus:outline-none focus:ring-0 w-full"
                        onChange={(e) => setIntroduction(e.target.value)}
                        required />
                      <span>{120 - introduction.length}</span>
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course description</Heading1>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} placeholder="Insert your course description" />
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course image</Heading1>
                    <div className="container flex flex-row justify-between">
                      <div className="function">
                        <p className="text mb-2 max-w-xl font-light mr-10">Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 450x250 pixels; .jpg or .png. No text on image.</p>
                        {thumbNail.publicID ? 
                        <div>
                          <span className="flex flex-row">
                            <button className="flex flex-row bg-[#331868] p-2 rounded-md mr-2">
                              <IconCrop stroke={2} color="white"/>
                              <p className="text-white">Crop Image</p>
                            </button>
                            <button className="flex flex-row bg-[#e95a5a] p-2 rounded-md" onClick={deleteThumbNail}>
                              <IconTrash stroke={2} color="white"/>
                              <p className="text-white">Delete Image</p>
                            </button>
                          </span>
                        </div> : <UploadWidget onUpload={handleOnUploadThumbNail} object="image" />}
                      </div>
                      <div className="media">
                        {thumbNail.publicID ? (
                        <Link target={"_blank"} to={thumbNail.secureURL}>  
                          <Image
                            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                            publicId={thumbNail.publicID}
                            width="450"
                            height="250"
                            crop="fill"
                            className='border'
                          />
                        </Link>
                      ): ( 
                        <Image
                          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                          publicId="multiMediaUpload"
                          width="450"
                          crop="fill"
                          className='border'
                        />
                      )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Promotional Video</Heading1>
                      <div className="container flex flex-row justify-between">
                        <div className="function">
                          <p className="text mb-2 max-w-xl font-light mr-10">Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering the course are more likely to enroll if your promo video is well-made.</p>
                          {promoVideoLink ? 
                          <div>
                            <span className="flex flex-row">
                              <button className="flex flex-row bg-[#331868] p-2 rounded-md mr-2">
                                <IconCrop stroke={2} color="white"/>
                                <p className="text-white">Crop Video</p>
                              </button>
                              <button className="flex flex-row bg-[#e95a5a] p-2 rounded-md" onClick={deletePromoVideo}>
                                <IconTrash stroke={2} color="white"/>
                                <p className="text-white">Delete Video</p>
                              </button>
                            </span>
                          </div> : <UploadWidget onUpload={handleOnUploadPromoVideo} object="video" />}
                        </div>
                        <div className="media">
                          {promoVideoId ? (
                          <Link target={"_blank"} to={promoVideoLink}>  
                            <Video
                              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                              publicId={promoVideoId}
                              width="450"
                              crop="fill"
                              controls
                              className="border"
                            />
                          </Link>
                        ): ( 
                          <Image
                            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                            publicId="multiMediaUpload"
                            width="450"
                            crop="fit"
                            className='border'
                          />
                        )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-5">
                    <Heading1>Course Price</Heading1>
                      <div className="container justify-between">
                        <div className="function">
                          <p className="text mb-2 max-w-xl font-light mr-10">Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free.</p>
                          <div className="price flex flex-row">
                            <div className="currency flex flex-col mr-4">
                              <span className='mr-2 font-bold'>Currency</span>
                              <select className=" p-3 w-full text-md hover:bg-gray-200 border border-black rounded-lg">
                                <option value="all">USD</option>
                              </select>
                            </div>
                            <div className="flex flex-col">
                              <span className='mr-2 font-bold'>Price Tier</span>
                              <select className="tier p-3 w-full text-md border border-black rounded-lg" onChange={(e) => setPrice(e.target.value)}>
                                <option value="free">Free</option>
                                <option value="19.99">$19.99 (Tier 1)</option>
                                <option value="29.99">$29.99 (Tier 2)</option>
                                <option value="54.99">$54.99 (Tier 3)</option>
                                <option value="79.99">$79.99 (Tier 4)</option>
                                <option value="109.99">$109.99 (Tier 5)</option>
                                <option value="149.99">$149.99 (Tier 6)</option>
                                <option value="199.99">$199.99 (Tier 7)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#af39d3]">Course Content</p>
                  <div className="courseContent flex flex-row items-center">
                    <p className="sectionLength text-lg text-[#7b7b7b] mr-10">
                      {sections.length === 0 && "No section"}
                      {sections.length === 1 && "1 section"}
                      {sections.length > 1 && `${sections.length} sections`}
                    </p>
                    <p className="totalLength text-lg text-[#7b7b7b]">{NumToTime(totalLength)}</p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Button 
                    color="black" 
                    className="flex flex-row rounded-full hover:bg-violet-600" 
                    style={{height: "48px"}} 
                    onClick={toggleAddSection}>
                    <IconPlus stroke={2} className="mr-2" />
                    <span className="font-bold text-base normal-case">
                      Add
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mt-6 border-t-2">
                <div className="form-group mb-5">
                {addSection && 
                  <div>
                    <Heading1>Create Your Section: </Heading1>
                    <div>
                      <div className="flex justify-between border border-black p-3 mb-2">
                        <input 
                          type="text" 
                          placeholder="Input your section name" 
                          maxLength={120} 
                          value={newSectionName} 
                          className="focus:outline-none focus:ring-0 w-full" 
                          onChange={handleSectionNameChange}/>
                        <span>120</span>
                      </div>
                      <Button 
                        color="black" 
                        className="rounded-none hover:bg-violet-800" 
                        style={{height: "48px"}} 
                        onClick={handleSectionCreate}>
                        <span className="font-bold text-base normal-case">
                          Add
                        </span>
                      </Button>
                    </div>
                    <hr className="border-[1px] border-black my-5"/>
                  </div>}
                  {sections.length === 0 && 
                  <div className={`${addSection === true ? "hidden" : "" } flex flex-row my-10`}>
                    <p className="flex flex-row text-lg mr-2 items-center">
                      <IconAlertCircleFilled color="red" className="mr-2"/>
                      Your section content is empty.
                    </p>
                    <p className="text-lg font-bold cursor-pointer hover:text-[#123456]" onClick={toggleAddSection}>Add section now!</p>
                  </div>}
                  {sections.map((section, index) => (
                    <Section
                      key={index}
                      sectionName={section.name}
                      sectionId={index}
                      lectures={section.lectures}
                      onLectureCreate={handleLectureCreate}
                      onSectionUpdate={handleSectionUpdate}
                      onLectureUpdate={handleLectureUpdate}
                      onLectureDelete={handleLectureDelete}
                      onSectionDelete={handleSectionDelete}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button color="purple" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => handleCreateCourse()}>
                  <span className="font-bold text-base normal-case">Create Course</span>
                </Button>
              </div>
            </DashboardHeaderTitle>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;