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

const AnsComp = ({ question }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState(null);

	// const handleEditOption = (question, index) => {
	// 	// Implement your edit logic here
	// 	console.log('Editing question:', question._id);
	// 	setEditedQuestion(question.content);
	// 	setEditingIndex(index);
	// 	setOpenDropdownIndex(null); // Close dropdown after selecting edit
	// };

	// const toggleDropdown = (index) => {
	// 	setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
	// };


  return (
    <div>
      


    </div>
  )
}

export default AnsComp;