import React from "react";
import { Button } from "@material-tailwind/react";


export default function CreateCourseCard() {
  return (
    <div className=" w-full p-12 mt-12 mb-6 drop-shadow-md border-2 bg-white flex justify-between">
      <div className="flex items-center">Jump into Course Creation</div>
        <Button color="purple" className="rounded-none hover:bg-violet-800" style={{width: "290px", height: "48px"}}>
          <span className="font-bold text-base">Create Your Course</span>
        </Button>
    </div>
  );
};