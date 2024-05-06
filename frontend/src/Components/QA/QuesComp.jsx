import React, { useEffect, useState } from "react";
import { getColor, createImageFromInitials } from '../Utils/Utils';
import { IconSearch, IconSend2 } from '@tabler/icons-react';
import axios from "axios";
import getTimeAgo from "../../helper/TimeAgo";
import { MdQuestionAnswer, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import ReactQuill from 'react-quill';
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "../../AuthContextProvider";
import { AiOutlineEllipsis } from 'react-icons/ai';
import WarningModal from "./WarningModal";

const maxChar = 255;

const QuesComp = ({ question, onUpdateQuestion }) => {
  const { userData } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleEditValue, setTitleEditValue] = useState(null);
  const [descEditValue, setDescEditValue] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleEditOption = () => {
    setIsEditing(true);
    setTitleEditValue(question.title);
    setDescEditValue(question.description);
  }


  const handleDeleteOption = () => {
    setShowWarningModal(true);
  }

  const deleteQuestion = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/questions/${question.course}/${question._id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting question", error);
    }
  }

  const confirmDelete = async () => {
    await deleteQuestion();
    setShowWarningModal(false);
    setTitleEditValue(null);
    setDescEditValue(null);
    setIsEditing(false);
    setOpenDropdown(false);
    await onUpdateQuestion(null);
  }

  const cancelDelete = () => {
    setShowWarningModal(false);
  }

  const getOneQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/questions/${question.course}/${question._id}`);
      return res.data;
    } catch (e) {
      console.error("Error getting one question", e)
    }
  }

  const handleEditRequest = async () => {
    try {

      // Define editQuestion as an asynchronous function
      const editQuestion = async (editedQuestion) => {
        const res = await axios.put(`http://localhost:5000/questions/${question.course}/${question._id}`, editedQuestion);
        return res.data; // Return the edited question data
      }

      // Call editQuestion and await its completion
      const data = await editQuestion({ title: titleEditValue, description: descEditValue });

      // Update state and fetch answers after the question is successfully edited
      setTitleEditValue(null);
      setDescEditValue(null);
      setIsEditing(false);
      setOpenDropdown(false)

      await onUpdateQuestion(data);
    } catch (error) {
      console.error('Error editing the question:', error);
    }
  }

  return (
    <div className="flex flex-row py-4 px-4">
      <div className="mx-2 w-[40px] min-w-[40px] mr-4">
        <img id='preview2' src={createImageFromInitials(130, question.user.firstName + " " + question.user.lastName, getColor())} alt='profile-pic' className='avatar' />
      </div>

      {isEditing ? (
        <div className="flex-grow">
          <div className="flex flex-row text-xs items-center">
            <p className="font-bold text-purple-500">{question.user.firstName + " " + question.user.lastName}</p>
            <p className="text-lg mx-1">·</p>
            <p>{getTimeAgo(new Date(question.createdAt))}</p>
          </div>

          <div className="border border-black p-2 px-4 flex mb-4">
            <input
              type="text"
              placeholder="e.g. Why do we use fit_transform() for training set"
              onChange={(e) => setTitleEditValue(e.target.value)}
              value={titleEditValue}
              className="flex-grow"
            />
            <span className="text-gray-400">{maxChar - titleEditValue.length}</span>
          </div>

          <div>
            <ReactQuill theme="snow" onChange={setDescEditValue} style={{ height: "200px", marginBottom: "70px" }} value={descEditValue} />
            <div className="flex gap-3">
              <CustomButton icon={null} text="Save" callBack={() => handleEditRequest()} />
              <CustomButton text="Cancel" callBack={() => setIsEditing(false)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow">
          <p className="line-clamp-2 leading-tight font-bold text-md">{question.title}</p>
          <div className="flex flex-row text-xs items-center mt-1">
            <p className="font-bold text-purple-500">{question.user.firstName + " " + question.user.lastName}</p>
            <p className="text-lg mx-1">·</p>
            <p>{getTimeAgo(new Date(question.createdAt))}</p>
          </div>
          <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: question.description }} />
        </div>

      )}

      {question.user._id === userData._id && !isEditing && (
        <div className="relative">
          <AiOutlineEllipsis
            className="h-6 w-6 text-gray-500 cursor-pointer ml-2"
            onClick={() => setOpenDropdown(!openDropdown)}
          />
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10">
              <button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleEditOption()}>
                Edit
              </button>
              <button className="block text-left w-full py-2 px-4 text-sm text-gray-800 hover:bg-gray-200" onClick={() => handleDeleteOption()}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      <WarningModal
        isOpen={showWarningModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default QuesComp;

export const CustomButton = ({ icon, text, callBack }) => {
  return (
    <button id="edit" className="flex bg-black text-sm hover:opacity-50 min-w-24 max-w-48 justify-center items-center p-2" onClick={callBack}>
      {icon}
      <p className="font-bold text-white mx-1">{text}</p>
    </button>
  )
}