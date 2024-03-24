import React from "react";
import DashboardHeaderTitle from "../../../Components/DashboardHeaderTitle";

const ManageCourses = () => {
  return (
    <DashboardHeaderTitle title={"Courses"}>
      <a href="/instructor/course/123/manage/curriculum">Edit course</a>
    </DashboardHeaderTitle>
  );
};

export default ManageCourses;
