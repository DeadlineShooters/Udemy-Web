import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const id = "the-complete-web-development-bootcamp";

  return (
    <div className="container">
      This is home page
      <br />
      <Link to={`/course/${id}`}>Course details</Link>
    </div>
  );
};

export default Home;
