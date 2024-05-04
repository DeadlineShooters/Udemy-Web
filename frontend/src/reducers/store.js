// store.js
import { configureStore } from "@reduxjs/toolkit";

const saveCourseReducer = (state = { handleCreateCourse: null }, action) => {
  switch (action.type) {
    case "SET_CREATE_COURSE_HANDLER":
      return {
        ...state,
        handleCreateCourse: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    saveCourse: saveCourseReducer,
  },
});

export default store;
