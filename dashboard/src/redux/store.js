import { configureStore } from '@reduxjs/toolkit';
import { currMeetingReducer } from './slices/currMeeting';
import { authReducer } from './slices/auth';
import { addMemberReducer } from './slices/addMember';

const store = configureStore({
  reducer: {
    currMeeting: currMeetingReducer,
    auth: authReducer,
    addMember: addMemberReducer,
  },
});

export default store;
