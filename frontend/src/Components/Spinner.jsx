import React from "react";

const Spinner = () => {
  return (
    <div className="m-auto w-16 aspect-content border rounded-full bg-gradient-to-r from-blue-600 to-transparent top-2.5 left-2.5 no-repeat, conic-gradient(#0000 30%, blue-600) animate-spin duration-1500 linear infinite">
      <div className="w-full h-full mask-radial from-transparent to-black"></div>
    </div>
  );
};

export default Spinner;
