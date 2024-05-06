// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  trackProgress: 0,
};

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

const trackProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TRACK_PROGRESS":
      return {
        ...state,
        trackProgress: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    saveCourse: saveCourseReducer,
    trackProgress: trackProgressReducer,
  },
});

export default store;
