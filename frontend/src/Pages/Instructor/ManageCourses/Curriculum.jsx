import React, { useState, useEffect, useRef } from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { IconPlus, IconAlertCircleFilled } from '@tabler/icons-react';
import './CreateCourse.css';
import Section from './HandleSections.jsx';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Curriculum = () => {
  const [sections, setSections] = useState([]);
  const [totalLength, setTotalLength] = useState();
  const [totalLecture, setTotalLecture] = useState();
  const [addSection, setAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [fieldChanged, setFieldChanged] = useState(false);
  const [showInformModal, setShowInformModal] = useState(false); // State for section modal

  const toggleAddSection = () => {
    setAddSection(!addSection);
  }

  useEffect(() => {
    const isFormChanged = !sections;
    setFieldChanged(isFormChanged);
  }, [sections]);

  const quillRef = useRef(); // Create a ref
  useEffect(() => {
    if (quillRef.current != null) {
      quillRef.current.getEditor().root.dataset.placeholder = "Insert your course description";
    }
  }, []);

  const navigate = useNavigate();

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
        sections: sections,
        totalSection: sections.length,
        totalLecture: totalLecture,
        totalLength: totalLength,
      };
      localStorage.setItem('tempSectionData', JSON.stringify(data));
    }
    calculateCourseLength();
    saveTempData();
  }, [sections]);

  const handleUpdateCourse = async () => {
    const data = {
      sections: sections,
      totalSection: sections.length,
      totalLecture: totalLecture,
      totalLength: totalLength,
      //instructor: userData.instructor,
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
    </DashboardHeaderTitle>
  );
};

export default Curriculum;
