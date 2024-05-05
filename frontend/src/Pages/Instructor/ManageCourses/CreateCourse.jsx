import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconPlus, IconTrash, IconAlertCircleFilled, IconCrop } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";
import Modal from "../../../Components/CourseManagement/Modal";
import { Image, Video } from "cloudinary-react";
import axios from "axios";
import "./CreateCourse.css";
import { useAuth } from "../../../AuthContextProvider.jsx";
import Section from "./HandleSections.jsx";

const CreateCourse = () => {
  const { userData } = useAuth();

  /* Fetch categories from the system */
  const [categories, setCategories] = useState();

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [courseCat, setCourseCat] = useState("");
  const [thumbNail, setThumbNail] = useState({ secureURL: "", publicID: "" });
  const [promoVideoLink, setPromoVideoLink] = useState();
  const [promoVideoId, setPromoVideoId] = useState();
  const [promoVideoDuration, setPromoVideoDuration] = useState();
  const [price, setPrice] = useState();
  const [sections, setSections] = useState([]);
  const [totalLength, setTotalLength] = useState();
  const [totalLecture, setTotalLecture] = useState();
  const [addSection, setAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  //Track any changes
  const [trackProgress, setTrackProgress] = useState(0);
  const [showInformModal, setShowInformModal] = useState(false); // State for section modal
  const [showWarningModal, setShowWarningModal] = useState(false); // State for section modal

  const saveToLocalStorage = () => {
    const data = {
      title: title !== undefined ? title : null,
      introduction: introduction !== undefined ? introduction : null,
      description: description !== undefined ? description : null,
      courseCat: courseCat !== undefined ? courseCat : null,
      thumbNail: thumbNail !== undefined ? thumbNail : null,
      promoVideoLink: promoVideoLink !== undefined ? promoVideoLink : null,
      promoVideoId: promoVideoId !== undefined ? promoVideoId : null,
      promoVideoDuration: promoVideoDuration !== undefined ? promoVideoDuration : null,
      price: price !== undefined ? price : null,
      sections: sections !== undefined ? sections : null,
      totalLength: totalLength !== undefined ? totalLength : null,
      totalLecture: totalLecture !== undefined ? totalLecture : null,
      addSection: addSection !== undefined ? addSection : null,
      newSectionName: newSectionName !== undefined ? newSectionName : null
    };
    localStorage.setItem('createCourse', JSON.stringify(data));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [title, introduction, description, courseCat, thumbNail, promoVideoLink, promoVideoId, promoVideoDuration, price, sections, totalLength, totalLecture, addSection, newSectionName]);

  const retrieveFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('createCourse'));
    if (data) {
      setTitle(data.title);
      setIntroduction(data.introduction);
      setDescription(data.description);
      setCourseCat(data.courseCat);
      setThumbNail(data.thumbNail);
      setPromoVideoLink(data.promoVideoLink);
      setPromoVideoId(data.promoVideoId);
      setPromoVideoDuration(data.promoVideoDuration);
      setPrice(data.price);
      setSections(data.sections);
      setTotalLength(data.totalLength);
      setTotalLecture(data.totalLecture);
      setAddSection(data.addSection);
      setNewSectionName(data.newSectionName);
    }
  };

  const calculateProgressRate = () => {
    const filledVariables = [
      title.trim(),
      introduction.trim(),
      description.trim(),
      courseCat.trim(),
      thumbNail.secureURL.trim(),
      thumbNail.publicID.trim(),
      promoVideoLink,
      promoVideoId,
      promoVideoDuration,
      price,
      sections.length > 0,
    ];
    const totalVariables = filledVariables.length;
    const filledCount = filledVariables.filter((variable) => !!variable).length;
    const progressRate = (filledCount / totalVariables) * 100;
    return progressRate;
  };

 
  useEffect(() => {
    retrieveFromLocalStorage();
  }, []);

  useEffect(() => {
    const progressRate = calculateProgressRate();
    setTrackProgress(progressRate);
  }, [title, introduction, description, courseCat, thumbNail, promoVideoLink, promoVideoId, promoVideoDuration, price, sections]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses/categories")
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOnUploadThumbNail = (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setThumbNail((prevState) => ({
      ...prevState,
      publicID: result?.info?.public_id,
      secureURL: result?.info?.secure_url,
    }));
  };

  const deleteThumbNail = () => {
    setThumbNail({ secureURL: "", publicID: "" });
  };

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
  };

  const deletePromoVideo = () => {
    setPromoVideoId();
    setPromoVideoLink();
    setPromoVideoDuration();
  };

  const quillRef = useRef(); // Create a ref
  useEffect(() => {
    if (quillRef.current != null) {
      quillRef.current.getEditor().root.dataset.placeholder = "Insert your course description";
    }
  }, []);

  const checkUpdateField = () => {
    if (trackProgress !== 0) {
      setShowInformModal(true);
    } else {
      navigate("/instructor/courses");
    }
  };

  const navigate = useNavigate();

  const goToCourses = () => {
    navigate("/instructor/courses");
  };

  const toggleAddSection = () => {
    setAddSection(!addSection);
  };

  const handleSectionNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleSectionCreate = () => {
    setAddSection(!addSection);
    if (newSectionName.trim() !== "") {
      setSections([...sections, { name: newSectionName, lectures: [] }]);
      setNewSectionName("");
    }
  };

  const handleLectureCreate = (sectionName, lectureName, lectureVideoLink, lectureVideoID, lectureVideoDuration, lectureVideoName) => {
    const updatedSections = sections.map((section) => {
      if (section.name === sectionName) {
        return {
          ...section,
          lectures: [...section.lectures, { name: lectureName, video: { secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName } }],
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
        const lectureIndex = updatedLectures.findIndex((lecture) => lecture.name === oldLectureName);
        updatedLectures[lectureIndex] = { name: lectureName, video: { secureURL: lectureVideoLink, publicID: lectureVideoID, duration: lectureVideoDuration, name: lectureVideoName } };
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });
    setSections(updatedSections);
  };

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
    const updatedSections = sections
      .map((section) => {
        if (section.name === sectionName) {
          // Clear lectures of the specified section
          return { ...section, lectures: [] };
        }
        return section;
      })
      .filter((section) => section.name !== sectionName); // Delete the specified section
    setSections(updatedSections);
  };

  const NumToTime = (num) => {
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - hours * 3600) / 60);
    let seconds = Math.round(num - hours * 3600 - minutes * 60);
    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  };

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
    calculateCourseLength();
  }, [sections]);

  const handleCreateCourse = () => {
    if (trackProgress !== 100) {
      setShowWarningModal(true);
    } else {
      handleUploadCourse();
    }
  };
  const handleUploadCourse = async () => {
    const data = {
      category: courseCat,
      title: title,
      introduction: introduction,
      description: description,
      thumbNail: { secureURL: thumbNail.secureURL, publicID: thumbNail.publicID },
      promotionalVideo: { secureURL: promoVideoLink, publicID: promoVideoId, duration: promoVideoDuration },
      price: price,
      sections: sections,
      totalSection: sections.length,
      totalLecture: totalLecture,
      totalLength: totalLength,
      instructor: userData._id,
      status: true,
    };
    console.log(data);
    try {
      const response = await axios.post("http://localhost:5000/instructor/create-course", { data });
      if (response.status === 200) {
        //After creating course, return the main page
        navigate("/instructor/courses", { replace: true });
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            title={"Return back?"}
            type={"inform"}
            description={`You have some changes on the course creating draft. Make sure if you to halt your journey of sharing`}
            handle={goToCourses}
            action={"Go to Dashboard"}
          />
        </div>
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
                        <option value="none" disabled selected>
                          Choose a category
                        </option>
                        {categories &&
                          categories.map((category, index) => {
                            return (
                              <option key={index} value={category._id}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-5">
                <Heading1>Course title</Heading1>
                <div className="flex justify-between border border-black p-3">
                  <input type="text" placeholder="Input the course's title" maxLength={120} className="focus:outline-none focus:ring-0 w-full" onChange={(e) => setTitle(e.target.value)} required />
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
                    required
                  />
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
                    <p className="text mb-2 max-w-xl font-light mr-10">
                      Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 450x250 pixels; .jpg or .png. No text on image.
                    </p>
                    {thumbNail.publicID ? (
                      <div>
                        <span className="flex flex-row">
                          <button className="flex flex-row bg-[#331868] p-2 rounded-md mr-2">
                            <IconCrop stroke={2} color="white" />
                            <p className="text-white">Crop Image</p>
                          </button>
                          <button className="flex flex-row bg-[#e95a5a] p-2 rounded-md" onClick={deleteThumbNail}>
                            <IconTrash stroke={2} color="white" />
                            <p className="text-white">Delete Image</p>
                          </button>
                        </span>
                      </div>
                    ) : (
                      <UploadWidget onUpload={handleOnUploadThumbNail} object="image" />
                    )}
                  </div>
                  <div className="media">
                    {thumbNail.publicID ? (
                      <Link target={"_blank"} to={thumbNail.secureURL}>
                        <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={thumbNail.publicID} width="450" height="250" crop="fill" className="border" />
                      </Link>
                    ) : (
                      <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId="multiMediaUpload" width="450" crop="fill" className="border" />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group mb-5">
                <Heading1>Promotional Video</Heading1>
                <div className="container flex flex-row justify-between">
                  <div className="function">
                    <p className="text mb-2 max-w-xl font-light mr-10">
                      Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering the course are more likely to enroll if your promo
                      video is well-made.
                    </p>
                    {promoVideoLink ? (
                      <div>
                        <span className="flex flex-row">
                          <button className="flex flex-row bg-[#331868] p-2 rounded-md mr-2">
                            <IconCrop stroke={2} color="white" />
                            <p className="text-white">Crop Video</p>
                          </button>
                          <button className="flex flex-row bg-[#e95a5a] p-2 rounded-md" onClick={deletePromoVideo}>
                            <IconTrash stroke={2} color="white" />
                            <p className="text-white">Delete Video</p>
                          </button>
                        </span>
                      </div>
                    ) : (
                      <UploadWidget onUpload={handleOnUploadPromoVideo} object="video" />
                    )}
                  </div>
                  <div className="media">
                    {promoVideoId ? (
                      <Link target={"_blank"} to={promoVideoLink}>
                        <Video cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={promoVideoId} width="450" crop="fill" controls className="border" />
                      </Link>
                    ) : (
                      <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId="multiMediaUpload" width="450" crop="fit" className="border" />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group mb-5">
                <Heading1>Course Price</Heading1>
                <div className="container justify-between">
                  <div className="function">
                    <p className="text mb-2 max-w-xl font-light mr-10">
                      Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses
                      with practice tests can not be free.
                    </p>
                    <div className="price flex flex-row">
                      <div className="currency flex flex-col mr-4">
                        <span className="mr-2 font-bold">Currency</span>
                        <select className=" p-3 w-full text-md hover:bg-gray-200 border border-black rounded-lg">
                          <option value="all">USD</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <span className="mr-2 font-bold">Price Tier</span>
                        <select className="tier p-3 w-full text-md border border-black rounded-lg" onChange={(e) => setPrice(e.target.value)}>
                          <option value="none" selected disabled>
                            Select price
                          </option>
                          <option value="0">Free</option>
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
                <Button color="black" className="flex flex-row rounded-full hover:bg-violet-600" style={{ height: "48px" }} onClick={toggleAddSection}>
                  <IconPlus stroke={2} className="mr-2" />
                  <span className="font-bold text-base normal-case">Add</span>
                </Button>
              </div>
            </div>
            <div className="mt-6 border-t-2">
              <div className="form-group mb-5">
                {addSection && (
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
                          onChange={handleSectionNameChange}
                        />
                        <span>120</span>
                      </div>
                      <Button color="black" className="rounded-none hover:bg-violet-800" style={{ height: "48px" }} onClick={handleSectionCreate}>
                        <span className="font-bold text-base normal-case">Add</span>
                      </Button>
                    </div>
                    <hr className="border-[1px] border-black my-5" />
                  </div>
                )}
                {sections.length === 0 && (
                  <div className={`${addSection === true ? "hidden" : ""} flex flex-row my-10`}>
                    <p className="flex flex-row text-lg mr-2 items-center">
                      <IconAlertCircleFilled color="red" className="mr-2" />
                      Your section content is empty.
                    </p>
                    <p className="text-lg font-bold cursor-pointer hover:text-[#123456]" onClick={toggleAddSection}>
                      Add section now!
                    </p>
                  </div>
                )}
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
              <Button color="black" className="rounded-none hover:bg-violet-800 mr-2" style={{ height: "48px" }}>
                <span className="font-bold text-base normal-case">Save as draft</span>
              </Button>
              <Button color="purple" className="rounded-none hover:bg-violet-800" style={{ height: "48px" }} onClick={() => handleCreateCourse()}>
                <span className="font-bold text-base normal-case">Create Course</span>
              </Button>
              <Modal
                showModal={showWarningModal}
                setShowModal={setShowWarningModal}
                title={"Create Failed"}
                type={"alert"}
                description={`You don't complete all fields needed for the course. Please complete it and try again ໒(⊙ᴗ⊙)७✎▤`}
                handle={setShowWarningModal}
                action={"OK"}
              />
            </div>
          </DashboardHeaderTitle>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
