import React, { useState, useEffect, useRef } from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { IconPlus, IconAlertCircleFilled } from '@tabler/icons-react';
import './CreateCourse.css';
import Section from './HandleSections.jsx';
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../../Components/CourseManagement/Modal.jsx";
import axios from "axios";
import { useCourse } from "../../../CourseContextProvider.jsx";
import { Bounce, toast } from 'react-toastify';

const Curriculum = () => {
  const { selectedCourse, setSelectedCourse } = useCourse();
  const [courseId, setCourseId] = useState("");
  const [instructor, setInstructor] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getSaveCourse = () => {
      const savedCourse = localStorage.getItem('course');
      if (savedCourse) {
        const course = JSON.parse(savedCourse);
        setCourseId(course._id);
        setInstructor(course.instructor);
        setSections(course.sectionList);
      }
    }
    getSaveCourse();
  }, [])

  useEffect(() => {
    const saveCourse = () => {
      const savedCourse = JSON.parse(localStorage.getItem('course'));
      let tempCourse;
      if (sections.length > 0) {
        tempCourse = {
          ...savedCourse,
          sectionList: sections,
        };
      } else {
        // If sections is empty, retain the previous sections in localStorage
        tempCourse = {
          ...savedCourse,
        };
      }
      localStorage.setItem("course", JSON.stringify(tempCourse));
    };
    saveCourse();
  }, [sections]);

  const [totalLength, setTotalLength] = useState();
  const [totalLecture, setTotalLecture] = useState();
  const [addSection, setAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [showInformModal, setShowInformModal] = useState(false); // State for section modal
  const [trackProgress, setTrackProgress] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false); // State for section modal

  const location = useLocation();
  let currentUrl = location.pathname;
  const replacedUrl = currentUrl.replace(/\/curriculum$/, '/basics');
  
  const toggleAddSection = () => {
    setAddSection(!addSection);
  }

  const navigate = useNavigate();

  const handleSectionNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleSectionCreate = () => {
    setAddSection(!addSection);
    if (newSectionName.trim() !== '') {
      setSections([...sections, { name: newSectionName, lectureList: [] }]);
      setNewSectionName('');
    }
  };

  const handleLectureCreate = (sectionName, lectureName, lectureVideoLink, lectureVideoID, lectureVideoDuration, lectureVideoName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        return { 
          ...section, 
          lectureList: [...section.lectureList, { name: lectureName, video: {secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName}}] 
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleLectureUpdate = (sectionName, lectureName, lectureVideoLink, lectureVideoID, lectureVideoDuration, lectureVideoName, oldLectureName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        let updatedLectures = section.lectureList;
        const lectureIndex = updatedLectures.findIndex(lecture => lecture.name === oldLectureName);
        updatedLectures[lectureIndex] = { name: lectureName, video: {secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName} };
        return { ...section, lectureList: updatedLectures };
      }
      return section;
    });
    setSections(updatedSections);
  }

  const handleLectureDelete = (sectionName, lectureName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        const updatedLectures = section.lectureList.filter((lecture) => lecture.name !== lectureName);
        return { ...section, lectureList: updatedLectures };
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
        return { ...section, lectureList: [] };
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
        section.lectureList.forEach((lecture) => {
          totalLecture += 1; // Add quantity of lecture of the section of the Course content
          totalLength += lecture.video.duration; // Add duration of each lecture to totalLength
          totalLength = Math.round(totalLength);
        });
      });
      setTotalLecture(totalLecture);
      setTotalLength(totalLength);
    };
    calculateCourseLength();
  }, [sections]);

  const calculateProgressRate = () => {
    const filledVariables = [
      sections.length > 0
    ];
    const totalVariables = filledVariables.length;
    const filledCount = filledVariables.filter(variable => !!variable).length;
    const progressRate = (filledCount / totalVariables) * 100;
    return progressRate;
  };

  useEffect(() => {
    const progressRate = calculateProgressRate();
    setTrackProgress(progressRate);
  }, [sections]);

  const handleSaveCourse = () => {
    if (trackProgress !== 100) {
      setShowWarningModal(true);
    } else {
      handleUploadCourse();
    }
  }

  const successNotify = () => {
    toast.success('Updated successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  
  const handleUploadCourse = async () => {
    const data = {
      instructor: instructor,
      sectionList: sections,
      totalSection: sections.length,
      totalLecture: totalLecture,
      totalLength: totalLength,
      status: true,
    }
    console.log("edit upload", data);
    try { 
      const response = await axios.put(`http://localhost:5000/instructor/${courseId}/update-section`, {data})
      if (response.status === 200) {
        console.log("after", response.data.course);
        successNotify();
        setSelectedCourse(response.data.course);
        localStorage.setItem("course", JSON.stringify(response.data.course));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <DashboardHeaderTitle title={"Curriculum"}>
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
              lectures={section.lectureList}
              onLectureCreate={handleLectureCreate}
              onSectionUpdate={handleSectionUpdate}
              onLectureUpdate={handleLectureUpdate}
              onLectureDelete={handleLectureDelete}
              onSectionDelete={handleSectionDelete}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-end bottom-0 items-end align-bottom">
        <Button color="black" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => navigate(replacedUrl)}>
          <span className="font-bold text-base normal-case">Go to Landing Page</span>
        </Button>
        <Button color="purple" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => handleSaveCourse()}>
          <span className="font-bold text-base normal-case">Save Course</span>
        </Button>
        <Modal 
          showModal={showWarningModal} 
          setShowModal={setShowWarningModal}
          title={"Edit Failed"}
          type={"alert"}
          description={`You don't complete all fields needed for the course. Please complete it and try again ໒(⊙ᴗ⊙)७✎▤`}
          handle={setShowWarningModal}
          action={"OK"}/>
      </div>
    </DashboardHeaderTitle>
  );
};

export default Curriculum;
