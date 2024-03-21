import React from "react";

const DashboardHeaderTitle = ({ children, title }) => {
  return (
    <div className="flex w-full">
      <div className="md:w-16 h-screen"></div>
      <div className="container mx-auto p-6 py-12 lg:px-12">
        <div className="flex justify-between mt-4 relative items-center">
          <h1 className="text-4xl font-bold text-gray-700 ">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardHeaderTitle;
