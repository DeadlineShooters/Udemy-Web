import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import Sidebar from "../../../Components/CourseManagement/Sidebar";
import Header from "../../../Components/CourseManagement/Header";
import TextInput from "./TextInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonDefault from "../../../Components/CourseFeedback/ButtonDefault";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ sectionName, lectures, onLectureCreate }) => {
  const [newLectureName, setNewLectureName] = useState('');

  const handleLectureNameChange = (e) => {
    setNewLectureName(e.target.value);
  };

  const handleCreateLecture = () => {
    if (newLectureName.trim() !== '') {
      onLectureCreate(sectionName, newLectureName);
      setNewLectureName('');
    }
  };

  return (
    <div>
      <h2>{sectionName}</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Lecture Name"
          value={newLectureName}
          onChange={handleLectureNameChange}
        />
        <button onClick={handleCreateLecture}>Create Lecture</button>
      </div>
      {/* Render existing lectures here */}
      {lectures.map((lecture, index) => (
        <div key={index}>{lecture}</div>
      ))}
    </div>
  );
};

const Lecture = ({ lectureName }) => {
  return <div>{lectureName}</div>;
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

  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');

  const handleSectionNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleSectionCreate = () => {
    if (newSectionName.trim() !== '') {
      setSections([...sections, { name: newSectionName, lectures: [] }]);
      setNewSectionName('');
    }
  };

  const handleLectureCreate = (sectionName, lectureName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        return { ...section, lectures: [...section.lectures, lectureName] };
      }
      return section;
    });
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
              <p className="text-2xl font-bold text-[#af39d3]">Basic information</p>
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
              <p className="text-2xl font-bold text-[#af39d3]">Section & lecture</p>
              <div className="mt-6 border-t-2">
                <div className="mt-6 "></div>
                  <div className="form-group mb-5">
                    <Heading1>Create section</Heading1>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Section Name"
                        value={newSectionName}
                        onChange={handleSectionNameChange}
                      />
                      <div className="flex justify-between border border-black p-3">
                        <input 
                          type="text" 
                          placeholder="Input your section name" 
                          maxLength={120} 
                          value={newSectionName} 
                          className="focus:outline-none focus:ring-0 w-full" />
                          <span>120</span>
                        </div>
                      <button onClick={handleSectionCreate}>Create Section</button>
                    </div>
                    {sections.map((section, index) => (
                      <Section
                        key={index}
                        sectionName={section.name}
                        lectures={section.lectures}
                        onLectureCreate={handleLectureCreate}
                      />
                    ))}
                  </div>
                </div>
            </DashboardHeaderTitle>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;