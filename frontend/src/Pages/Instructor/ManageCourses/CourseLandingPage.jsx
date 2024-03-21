import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import TextInput from "./TextInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";

const CourseLandingPage = () => {
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

  return (
    <DashboardHeaderTitle title={"Course landing page"}>
      <div className="mt-6 border-t-2">
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
    </DashboardHeaderTitle>
  );
};

export default CourseLandingPage;
