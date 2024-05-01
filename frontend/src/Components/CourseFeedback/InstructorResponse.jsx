import { createImageFromInitials } from "../Utils/Utils";
export default function InstructorResponse({ response }) {
  return (
    <div className="flex flex-col  mt-4 justify-between">
      <div className="flex items-start ">
        <img src={createImageFromInitials(160, response.firstName + " " + response.lastName)} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
        <div className="flex flex-col">
          <div className="flex items-center ">
            <div className="font-bold text-gray-500 text-lg mr-1">{`${response.firstName} ${response.lastName}`}</div>
            <div className="text-lg text-gray-500">• {response.createdTime}</div>
          </div>
          <div className="mb-2">{response.content}</div>
        </div>
      </div>
    </div>
  );
}
