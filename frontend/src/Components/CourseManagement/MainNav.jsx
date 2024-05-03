import { useParams , NavLink, useNavigate } from "react-router-dom";
import './MainNav.css';

function MainNav() {
  const { courseSlug } = useParams();
  return (
    <nav>
      <ul className="flex flex-col gap-3">
      <li>
          <NavLink
            to={`/instructor/course/${courseSlug}/manage/basics`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-50 border-l-4 border-black  font-medium py-3 px-6 transition-colors duration-300 rounded"
                : "flex items-center gap-3 text-gray-600 font-medium py-3 px-6 transition-colors duration-300 hover:text-gray-800 hover:bg-gray-50 rounded"
            }
          >
            <span>Landing Page</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/instructor/course/${courseSlug}/manage/curriculum`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-50 border-l-4 border-black font-medium py-3 px-6 transition-colors duration-300 rounded"
                : "flex items-center gap-3 text-gray-600 font-medium py-3 px-6 transition-colors duration-300 hover:text-gray-800 hover:bg-gray-50 rounded"
            }
          >
            <span>Curriculum</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
