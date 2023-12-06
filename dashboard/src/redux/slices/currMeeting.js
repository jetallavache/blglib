import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCurrMeeting = createAsyncThunk(
  'currMeeting/fetchCurrMeeting',
  async () => {
    const { data } = await axios.get('/');
    return data;
  }
);

const initialState = {
  currMeeting: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const currMeetingSlice = createSlice({
  name: 'currMeeting',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrMeeting.pending]: (state) => {
      state.currMeeting.items = [];
      state.currMeeting.status = 'loading';
    },
    [fetchCurrMeeting.fulfilled]: (state, action) => {
      state.currMeeting.items = action.payload;
      state.currMeeting.status = 'loaded';
    },
    [fetchCurrMeeting.rejected]: (state) => {
      state.currMeeting.items = [];
      state.currMeeting.status = 'error';
    },
  },
});

export const currMeetingReducer = currMeetingSlice.reducer;
