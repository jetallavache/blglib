import { configureStore } from '@reduxjs/toolkit';
import { currMeetingReducer } from './slices/currMeeting';
import { addMemberReducer } from './slices/addMember';

const store = configureStore({
  reducer: {
    currMeeting: currMeetingReducer,
    addMember: addMemberReducer,
  },
});

export default store;
