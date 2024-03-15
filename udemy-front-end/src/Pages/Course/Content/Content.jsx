import React, {useState, useEffect} from 'react';
import './Content.css';
import arrow_down from "../../../Assets/arrow_down.png";
import arrow_up from "../../../Assets/arrow_up.png";
import ReactPlayer from 'react-player';

const CourseContent = () => {
  const courseContent = {
    author: "Tomato Group 09",
    lecturePlaying: {sectionID: 1, lectureID: 1},
    video :
    [{
      sectionID: 1,
      sectionName: "Introduction to course",
      videoNum: 2,
      courseLecture: [
      {
        lectureID: 1,
        lectureName: "Introducing the authors",
        url: "https://www.youtube.com/watch?v=KNtJGQkC-WI",
      }, 
      {
        lectureID: 2,
        lectureName: "Presenting the course structure",
        url: "https://www.youtube.com/watch?v=j23AZoRyOWk",
      }]
    },
    {
      sectionID: 2,
      sectionName: "Software design",
      videoNum: 3,
      courseLecture: [
      {
        lectureID: 3,
        lectureName: "Test 01",
        url: "https://www.youtube.com/watch?v=ZXNrz72k1ew",
      }, 
      {
        lectureID: 4,
        lectureName: "Test 02",
        url: "https://www.youtube.com/watch?v=j23AZoRyOWk",
      },
      {
        lectureID: 5,
        lectureName: "Test 03",
        url: "https://www.youtube.com/watch?v=j23AZoRyOWk",
      }]
    },
    {
      sectionID: 3,
      sectionName: "Ending course",
      videoNum: 1,
      courseLecture: [
      {
        lectureID: 6,
        lectureName: "Introducing the authors",
        url: "https://www.youtube.com/watch?v=PUofnMN4v0k",
      }, 
      {
        lectureID: 7,
        lectureName: "Presenting the course structure",
        url: "https://www.youtube.com/watch?v=j23AZoRyOWk",
      }]
    }]
  };
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (sectionID) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionID]: !prevState[sectionID]
    }));
  };
  const [videoUrl, setVideoUrl] = useState("");
  const initialSelectLecture = JSON.parse(localStorage.getItem('selectLecture')) || {};
  const [selectLecture, setSelectLecture] = useState(initialSelectLecture);
  const toggleSelectLecture = (lectureID) => {
    setSelectLecture(prevState => ({
      [lectureID]: !prevState[lectureID]
    }));
  };
  useEffect(()=> {
    const getVideoUrl = (courseContent, sectionID, lectureID) => {
      const targetSection = courseContent.video.find((section) => section.sectionID === sectionID);
      if (targetSection)
      {
        const targetLecture = targetSection.courseLecture.find((lecture) => lecture.lectureID === lectureID);
        if (targetLecture) {
          const targetURL = targetLecture.url;
          return targetURL;
        } else {
          console.log("Lecture not found with given LectureID");
        }
      } else {
        console.log("Lecture not found with given SectionID");
      }
    }
    if (courseContent.lecturePlaying.sectionID != null && courseContent.lecturePlaying.lectureID != null) {
      const url = getVideoUrl(courseContent, courseContent.lecturePlaying.sectionID, courseContent.lecturePlaying.lectureID);
      setVideoUrl(url);
    } else {
      setVideoUrl(courseContent.video[0].courseLecture[0].url);
    }
  }, []);
  useEffect(()=> {
    localStorage.setItem('selectLecture', JSON.stringify(selectLecture));
  }, [selectLecture]);

  const [loading, setLoading] = useState(false);
  const handleLectureClick = (videoUrl, sectionID, lectureID) => {
    setLoading(true);
    setVideoUrl(videoUrl);
    setLoading(false);
  };
  return (
    <div class="flex flex-row">
      {!loading ? 
        (<div class="flex flex-col">
          <ReactPlayer controls={true} url={videoUrl} height="603px" width="1072px"/>
        </div>) : 
        (<div role="status" class="flex bg-slate-900 items-center justify-center" style={{height: "603px", width:"3560px"}}>
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          <span class="sr-only">Loading...</span>
        </div>)
      }
      <div class="flex flex-col w-full">
        <div class="flex flew-row border">
          <p class="font-bold text-xl my-5 ml-5">Course content</p>
        </div>
        {courseContent.video.map((content) => (
          <div key={content.sectionID}>
            <div class="flex flew-row border justify-between items-center cursor-pointer" onClick={() => toggleSection(content.sectionID)}>
              <p class="font-bold text-base my-3 ml-5">Section {content.sectionID}: {content.sectionName}</p>
              <img src={expandedSections[content.sectionID] ? arrow_up : arrow_down} alt={expandedSections[content.sectionID] ? 'up-arrow' : 'down-arrow'} class="w-5 h-5 mr-5"></img>
            </div>
            <div class={`${expandedSections[content.sectionID] ? 'flex flex-col' : 'hidden'} ml-5 cursor-pointer`}>
              {content.courseLecture.map((lecture) => (
                <div key={lecture.lectureID} class={`${selectLecture[lecture.lectureID] ? 'bg-slate-200' : ''} my-3 hover:bg-slate-200 flex flex-row items-center z-10`}>
                  <input id={lecture.lectureID} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5"/>
                  <p onClick={() => {{handleLectureClick(lecture.url, content.sectionID, lecture.lectureID)}; toggleSelectLecture(lecture.lectureID)}}>{lecture.lectureName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseContent;