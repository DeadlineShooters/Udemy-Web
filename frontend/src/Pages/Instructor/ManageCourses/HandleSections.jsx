import React from "react";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { IconPlus, IconEdit, IconTrash, 
        IconCheck, IconAlertCircleFilled, IconClipboardText, 
        IconBrandYoutubeFilled, IconEye, IconCrop } from '@tabler/icons-react';
import { useState} from "react";
import UploadWidget from "./UploadWidget";
import Modal from "../../../Components/CourseManagement/Modal";
import VideoModal from "../../../Components/CourseManagement/VideoModal";
import DynamicInput from "../../../Components/CourseManagement/DynamicInput";
import './CreateCourse.css';

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

export default Section;