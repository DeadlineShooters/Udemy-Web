import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDefault from "../CourseFeedback/ButtonDefault";
import { useSelector } from "react-redux";

export default function Header() {
  const handleCreateCourse = useSelector((state) => state.saveCourse.handleCreateCourse);
  const navigate = useNavigate();
  const location = useLocation();

  // get course id from route params
  // dummy course name:
  const course_name = "Test2";

  const goToCourses = () => {
    navigate("/instructor/courses"); // navigate to /instructor/courses
  };

  const onSave = () => {
    handleCreateCourse();
  };
  return (
    <header className=" fixed bg-gray-900 py-5 px-8 border-b border-gray-200 flex gap-6 items-center justify-between w-full z-99999">
      <div className="flex gap-6 items-center">
        <button onClick={goToCourses}>
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
        </button>
        <span className="text-white hidden sm:block">Back to courses</span>
        <span className="text-white text-xl font-bold">{course_name}</span>
      </div>
      <ButtonDefault text={"Save"} handleClick={onSave} />
    </header>
  );
}
