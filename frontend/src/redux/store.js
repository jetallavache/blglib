import { configureStore } from '@reduxjs/toolkit';
import { currMeetingReducer } from './slices/currMeeting';

const store = configureStore({
  reducer: {
    currMeeting: currMeetingReducer,
  },
});

export default store;
