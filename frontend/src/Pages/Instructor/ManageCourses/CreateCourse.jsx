import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import TextInput from "./TextInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonDefault from "../../../Components/CourseFeedback/ButtonDefault";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconPlus, IconEdit, IconTrash, 
        IconCheck, IconAlertCircleFilled, IconClipboardText, 
        IconBrandYoutubeFilled, IconEye } from '@tabler/icons-react';
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";

const DynamicInput = ({ defaultValue, onChange, className, maxLength }) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);
  const maxWidth = 600;
  useEffect(() => {
    if (inputRef.current) {
      let newWidth = Math.max(value.length, defaultValue.length) * 12;
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
      }
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [value, defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input 
      type="text"
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className={className}
      maxLength={maxLength}
      autoFocus
    />
  );
};

const Section = ({ sectionName, sectionId, lectures, onLectureCreate, onSectionUpdate, onLectureUpdate}) => {
  const [addLecture, setAddLecute] = useState(false);
  const [newLectureName, setNewLectureName] = useState('');
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [oldLectureName, setOldLectureName] = useState("");
  const [oldLectureVideo, setOldLectureVideo] = useState("");
  const [editLectureName, setEditLectureName] = useState("");
  const [editUrl, setEditUrl] = useState();

  const handleOnUpload = (error, result, widget) => {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  const handleOnEditUpload = (error, result, widget) => {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setEditUrl(result?.info?.secure_url);
  }

  const toggleAddLecture = () => {
    setAddLecute(!addLecture)
  }

  const handleLectureNameChange = (e) => {
    setNewLectureName(e.target.value);
  };

  const handleCreateLecture = () => {
    setAddLecute(!addLecture);
    if (newLectureName.trim() !== '') {
      onLectureCreate(sectionName, newLectureName, url);
      setNewLectureName('');
      updateUrl();
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
      updateUrl();
    } else {
      setEditUrl();
    }
    //Handle delete image from cloudinary
  }

  const EditLecture = (lecture) => {
    setIsEditLecture(!isEditLecture);
    setOldLectureName(lecture.name);
    setOldLectureVideo(lecture.video);
    setEditLectureName(lecture.name);
    setEditUrl(lecture.video);
  }
  const handleEditLectureName = (e) => {
    setEditLectureName(e.target.value);
  };
  const handleUpdateLecture = () => {
    if (editLectureName.trim() !== '' && editUrl) {
      onLectureUpdate(sectionName, editLectureName, editUrl, oldLectureName, oldLectureVideo);
      setIsEditLecture(false);
      setEditLectureName("");
      setEditUrl();
    }
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
          <button className="bg-[#e95a5a] p-1 rounded-md">
            <IconTrash stroke={2} color="white"/>
          </button>
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
          <span>120</span>
        </div>
        {url ? <div className="flex justify-between border border-black p-3 mb-2 items-center">
          <div><IconBrandYoutubeFilled className="mr-2" /></div>
          <input 
            type="text" 
            placeholder="Input your lecture name" 
            maxLength={120} 
            defaultValue={url} 
            className="focus:outline-none focus:ring-0 w-full" />
          <span className="flex flex-row">      
            <Link target={"_blank"} to={url}>       
              <button 
                className="flex flex-row p-1 px-2 bg-[#241d6c] rounded-md mr-2">
                  <IconEye stroke={2} color="white" className="mr-2"/>
                  <p className="font-bold text-white">Preview</p>
              </button>
            </Link>
            <button className="bg-[#e95a5a] p-1 rounded-md" onClick={DeleteSelectVideo}>
              <IconTrash stroke={2} color="white"/>
            </button>
          </span>
        </div> : <UploadWidget onUpload={handleOnUpload} />}
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
          <span>120</span>
        </div>
        {editUrl ? <div className="flex justify-between border border-black p-3 mb-2 items-center">
          <div><IconBrandYoutubeFilled className="mr-2" /></div>
          <input 
            type="text"
            maxLength={120} 
            defaultValue={editUrl} 
            className="focus:outline-none focus:ring-0 w-full"/>
          <span className="flex flex-row">      
            <Link target={"_blank"} to={url}>       
              <button 
                className="flex flex-row p-1 px-2 bg-[#241d6c] rounded-md mr-2">
                  <IconEye stroke={2} color="white" className="mr-2"/>
                  <p className="font-bold text-white">Preview</p>
              </button>
            </Link>
            <button className="bg-[#e95a5a] p-1 rounded-md" onClick={DeleteSelectVideo}>
              <IconTrash stroke={2} color="white"/>
            </button>
          </span>
        </div> : <UploadWidget onUpload={handleOnEditUpload} />}
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
                  <p className="w-full line-clamp-2">Lecture {index + 1}: {lecture.name}</p>
                  <Link to={lecture.video} target="_blank">
                    <p className="text-gray-600 text-sm">
                      Video
                    </p>
                  </Link>
                </div>
              </div>            
              <div>
                <button 
                  className="py-1 px-5 border border-black rounded-md"
                  onClick={() => EditLecture(lecture)}>
                    <p className="font-bold text-[#752f93]">Edit</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CreateCourse = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const quillRef = useRef(); // Create a ref
  useEffect(() => {
    if (quillRef.current != null) {
      quillRef.current.getEditor().root.dataset.placeholder = "Insert your course description";
    }
  }, []);
  const navigate = useNavigate();
  const goToCourses = () => {
    navigate("/instructor/courses");
  };
  const onSave = () => {};
  const [addSection, setAddSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');

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

  const handleLectureCreate = (sectionName, lectureName, lectureVideo) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        return { 
          ...section, 
          lectures: [...section.lectures, { name: lectureName, video: lectureVideo }] 
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleLectureUpdate = (sectionName, lectureName, lectureVideo, oldLectureName, oldLectureVideo) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        let updatedLectures = section.lectures;
        const lectureIndex = updatedLectures.findIndex(lecture => lecture.name === oldLectureName);
        updatedLectures[lectureIndex] = { name: lectureName, video: lectureVideo };
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });
    setSections(updatedSections);
  }

  const handleSectionUpdate = (sectionId, newSectionName) => {
    // Create a new copy of sections array
    const updatedSections = [...sections];

    // Update the name of the section with the given id
    updatedSections[sectionId].name = newSectionName;

    // Update the state
    setSections(updatedSections);
  };

  return (
    <div>
      <header className="bg-gray-900 py-5 px-8 border-b border-gray-200 flex gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
            <button onClick={goToCourses}>
            <FontAwesomeIcon icon={faChevronLeft} color="white" />
            </button>
            <span className="text-white hidden sm:block">Back to courses</span>
        </div>
        <ButtonDefault text={"Save"} handleClick={onSave} />
      </header>
        <div className="flex px-32 py-5 bg-gray-50">
          <main className="w-full shadow-xl bg-white">
            <DashboardHeaderTitle title={"Create Course"}>
              <p className="text-3xl font-bold text-[#af39d3]">Basic information</p>
              <p className="text-lg font-md text-[#7b7b7b]">Course landing page & Instructor profile</p>
              <div className="my-6 border-y-2">
                <div className="mt-6 "></div>
                  <div className="form-group mb-5">
                    <Heading1>Course title</Heading1>
                    <TextInput limit={60} placeholder={"Insert your course title"} />
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course subtitle</Heading1>
                    <TextInput limit={120} placeholder={"Insert your course subtitle"} />
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course description</Heading1>
                    <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Insert your course description" />
                  </div>
                  <div className="form-group mb-5">
                    <Heading1>Course image</Heading1>
                  <div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#af39d3]">Course Content</p>
                  <p className="text-lg text-[#7b7b7b]">
                    {sections.length === 0 && "No section"}
                    {sections.length === 1 && "1 section"}
                    {sections.length > 1 && `${sections.length} sections`}
                  </p>
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
                  </Button></div>
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
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button color="white" className="rounded-none hover:bg-gray-100 border mr-2" style={{height: "48px"}} onClick={() => navigate("/instructor/course/create", {replace: true})}>
                  <span className="font-bold text-base normal-case">Cancel</span>
                </Button>
                <Button color="purple" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => navigate("/instructor/course/create", {replace: true})}>
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