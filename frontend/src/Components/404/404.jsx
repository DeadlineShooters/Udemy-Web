import React from "react";
import notFound from "../../Assets/404_error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="md:w-1/4 pt-36 pb-10" src={notFound} alt="not-found" />
      <p className="text-3xl font-bold py-5">Sorry (ಥ﹏ಥ), we couldn't find your page! </p>
      <button
        type="button"
        className="text-white bg-sky-950 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-bold text-xl rounded-lg px-3 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <Link to="/"> Return home </Link>
      </button>
    </div>
  );
};

export default NotFound;
