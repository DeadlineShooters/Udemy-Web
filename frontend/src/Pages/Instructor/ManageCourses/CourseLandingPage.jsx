import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";
import Heading1 from "../../../Components/CourseManagement/Heading1";
import TextInput from "./TextInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IconPlus, IconEdit, IconTrash, 
  IconCheck, IconAlertCircleFilled, IconClipboardText, 
  IconBrandYoutubeFilled, IconEye, IconCrop } from '@tabler/icons-react';
import UploadWidget from "./UploadWidget";
import { Link } from "react-router-dom";
import { Image, Video } from 'cloudinary-react';
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import './CreateCourse.css'

const CourseLandingPage = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [thumbNail, setThumbNail] = useState({ secureURL: '', publicID: '' });
  const [promoVideoLink, setPromoVideoLink] = useState();
  const [promoVideoId, setPromoVideoId] = useState();
  const [promoVideoDuration, setPromoVideoDuration] = useState();
  const [price, setPrice] = useState();
  const [courseCat, setCourseCat] = useState("");
  const [categories, setCategories] = useState();
  const location = useLocation();
  let currentUrl = location.pathname;
  const replacedUrl = currentUrl.replace(/\/basics$/, '/curriculum');
  const navigate = useNavigate();
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

  return (
    <DashboardHeaderTitle title={"Course landing page"}>
      <div className="mt-6 border-t-2">
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
        <div className="flex flex-row justify-end">
          <Button color="black" className="rounded-none hover:bg-violet-800" style={{height: "48px"}} onClick={() => navigate(replacedUrl)}>
            <span className="font-bold text-base normal-case">Go to Curriculum</span>
          </Button>
          <Button color="purple" className="rounded-none hover:bg-violet-800" style={{height: "48px"}}>
            <span className="font-bold text-base normal-case">Save</span>
          </Button>
        </div>       
      </div>
    </DashboardHeaderTitle>
  );
};

export default CourseLandingPage;
